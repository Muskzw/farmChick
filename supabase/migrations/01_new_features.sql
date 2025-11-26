-- Vaccinations Table
create table vaccinations (
  id uuid default gen_random_uuid() primary key,
  batch_id uuid references batches on delete cascade not null,
  name text not null, -- e.g., 'Gumboro', 'Newcastle'
  scheduled_date date not null,
  status text check (status in ('pending', 'completed', 'missed')) default 'pending',
  completed_date date,
  notes text
);

alter table vaccinations enable row level security;

create policy "Users can view vaccinations for their batches." on vaccinations
  for select using (
    exists ( select 1 from batches where id = vaccinations.batch_id and user_id = auth.uid() )
  );

create policy "Users can insert vaccinations for their batches." on vaccinations
  for insert with check (
    exists ( select 1 from batches where id = vaccinations.batch_id and user_id = auth.uid() )
  );

create policy "Users can update vaccinations for their batches." on vaccinations
  for update using (
    exists ( select 1 from batches where id = vaccinations.batch_id and user_id = auth.uid() )
  );

-- Expenses Table
create table expenses (
  id uuid default gen_random_uuid() primary key,
  batch_id uuid references batches on delete cascade not null,
  category text not null, -- 'feed', 'medicine', 'chicks', 'labor', 'other'
  amount numeric not null,
  date date not null default CURRENT_DATE,
  notes text
);

alter table expenses enable row level security;

create policy "Users can view expenses for their batches." on expenses
  for select using (
    exists ( select 1 from batches where id = expenses.batch_id and user_id = auth.uid() )
  );

create policy "Users can insert expenses for their batches." on expenses
  for insert with check (
    exists ( select 1 from batches where id = expenses.batch_id and user_id = auth.uid() )
  );

create policy "Users can update expenses for their batches." on expenses
  for update using (
    exists ( select 1 from batches where id = expenses.batch_id and user_id = auth.uid() )
  );

create policy "Users can delete expenses for their batches." on expenses
  for delete using (
    exists ( select 1 from batches where id = expenses.batch_id and user_id = auth.uid() )
  );

-- Sales Table
create table sales (
  id uuid default gen_random_uuid() primary key,
  batch_id uuid references batches on delete cascade not null,
  quantity integer not null,
  weight numeric, -- total weight in kg
  price_per_unit numeric not null, -- price per bird or per kg
  total_amount numeric not null,
  date date not null default CURRENT_DATE,
  buyer_name text,
  notes text
);

alter table sales enable row level security;

create policy "Users can view sales for their batches." on sales
  for select using (
    exists ( select 1 from batches where id = sales.batch_id and user_id = auth.uid() )
  );

create policy "Users can insert sales for their batches." on sales
  for insert with check (
    exists ( select 1 from batches where id = sales.batch_id and user_id = auth.uid() )
  );

create policy "Users can update sales for their batches." on sales
  for update using (
    exists ( select 1 from batches where id = sales.batch_id and user_id = auth.uid() )
  );

create policy "Users can delete sales for their batches." on sales
  for delete using (
    exists ( select 1 from batches where id = sales.batch_id and user_id = auth.uid() )
  );
