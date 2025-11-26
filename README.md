# FarmChick - Broiler Management App

FarmChick is a comprehensive mobile application designed to help poultry farmers manage their broiler farms efficiently. From tracking daily mortality and feed intake to analyzing profitability and connecting with buyers, FarmChick covers the entire lifecycle of broiler farming.

## 📱 Features

-   **Authentication**: Secure login and signup for farmers.
-   **Dashboard**: Real-time overview of active batches, total bird count, and alerts (e.g., vaccination reminders).
-   **Farm Management**:
    -   **Batch Tracking**: Manage multiple batches (Active, Planning, Sold).
    -   **Daily Logs**: Record mortality, culls, feed consumption, and average weight.
    -   **Pre-arrival Checklist**: Interactive checklist to prepare for new chicks.
-   **Marketplace**: Browse and order feed, equipment, and chicks directly from the app.
-   **Analysis**: (Coming Soon) Profit estimation and growth charts.

## 🛠 Tech Stack

-   **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
-   **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
-   **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
-   **Backend**: [Supabase](https://supabase.com/) (PostgreSQL + Auth)

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) installed.
-   [Expo Go](https://expo.dev/client) app installed on your iOS or Android device.

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    -   Create a `.env` file in the root directory.
    -   Add your Supabase credentials:
        ```env
        EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
        EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
        ```

4.  **Database Setup**:
    -   Go to your Supabase Dashboard -> SQL Editor.
    -   Run the SQL script located in `supabase/schema.sql`. This will create the necessary tables and security policies.

### Running the App

1.  Start the development server:
    ```bash
    npx expo start --clear
    ```

2.  Scan the QR code with the **Expo Go** app on your phone.

## 📂 Project Structure

-   `app/`: Contains the application screens and navigation logic (Expo Router).
-   `components/`: Reusable UI components (Button, Input, etc.).
-   `context/`: React Context providers (e.g., AuthContext).
-   `lib/`: Utility functions and clients (e.g., Supabase client).
-   `supabase/`: SQL schema and database related files.
-   `assets/`: Images and fonts.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
