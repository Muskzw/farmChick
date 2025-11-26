-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  farm_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(full_name) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for batches
create table batches (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  breed text,
  start_date date not null,
  initial_count integer not null,
  status text check (status in ('active', 'sold', 'planning')) default 'active'
);

alter table batches enable row level security;

create policy "Users can view own batches." on batches
  for select using (auth.uid() = user_id);

create policy "Users can insert own batches." on batches
  for insert with check (auth.uid() = user_id);

create policy "Users can update own batches." on batches
  for update using (auth.uid() = user_id);

create policy "Users can delete own batches." on batches
  for delete using (auth.uid() = user_id);

-- Create a table for daily logs
create table daily_logs (
  id uuid default gen_random_uuid() primary key,
  batch_id uuid references batches on delete cascade not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  mortality integer default 0,
  culls integer default 0,
  feed_intake numeric default 0, -- in kg
  weight numeric, -- average weight in grams
  notes text
);

alter table daily_logs enable row level security;

create policy "Users can view logs for their batches." on daily_logs
  for select using (
    exists ( select 1 from batches where id = daily_logs.batch_id and user_id = auth.uid() )
  );

create policy "Users can insert logs for their batches." on daily_logs
  for insert with check (
    exists ( select 1 from batches where id = daily_logs.batch_id and user_id = auth.uid() )
  );

create policy "Users can update logs for their batches." on daily_logs
  for update using (
    exists ( select 1 from batches where id = daily_logs.batch_id and user_id = auth.uid() )
  );

-- Create a table for products (Marketplace)
create table products (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references auth.users on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  category text not null, -- 'feed', 'equipment', 'chicks', 'medicine'
  price numeric not null,
  description text,
  image_url text,
  contact_info text
);

alter table products enable row level security;

create policy "Products are viewable by everyone." on products
  for select using (true);

create policy "Users can insert their own products." on products
  for insert with check (auth.uid() = seller_id);

create policy "Users can update their own products." on products
  for update using (auth.uid() = seller_id);

create policy "Users can delete their own products." on products
  for delete using (auth.uid() = seller_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, farm_name)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'farm_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
