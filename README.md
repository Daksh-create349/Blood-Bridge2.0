# Blood Bridge 🩸

Welcome to Blood Bridge, a smart, AI-powered platform designed to connect blood banks, hospitals, and donors to save lives. It provides real-time inventory management, urgent request broadcasting, and intelligent forecasting to prevent critical shortages.

https://github.com/user-attachments/assets/1955c4d3-b1d5-4a55-83de-a8e561a34b2f

## ✨ Key Features

- **Real-Time Inventory Dashboard**: Monitor blood supply levels, quantities, and locations at a glance. Filter resources by blood type and status (Available, Low, Critical).
- **Urgent Request System**: Hospitals can broadcast urgent needs for specific blood types, defining quantity, urgency, and a notification radius (5km/10km).
- **Active Alerts**: Donors and blood banks can view a live feed of active urgent requests and respond to them.
- **AI-Powered Supply Forecasting**: Utilizes Genkit and Google's Gemini AI to predict future blood demand based on historical data and upcoming events, helping to proactively manage inventory.
- **AI-Powered Urgent Request Analysis**: An AI agent analyzes the parameters of an urgent request (blood type, quantity, urgency, donor count) to recommend the optimal alert timing and scope.
- **Donor Management**: View and manage a list of registered donors, with filtering by blood type and location.
- **Analytics**: Visualize blood supply data through interactive charts, showing inventory by blood type and status.
- **Splash Screen**: An animated splash screen that provides a polished and engaging entry into the application.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini models
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React Hooks (`useState`, `useContext`) with a custom `useLocalStorage` hook for data persistence in this demo.

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later)
- [npm](https://www.npmjs.com/) or a compatible package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/blood-bridge.git
    cd blood-bridge
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Google AI API key. You can get a key from [Google AI Studio](https://aistudio.google.com/).

    ```env
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## 📁 Project Structure

- **`/src/app`**: Contains all pages and layouts, organized using the Next.js App Router.
- **`/src/components`**: Home to all reusable React components.
  - **`/ui`**: Core ShadCN UI components.
  - **`/layout`**: Components that define the main structure of the app (e.g., sidebar, splash screen).
  - **`/pages`**: Components specific to a particular page or feature.
- **`/src/ai`**: Houses the AI logic and Genkit flows.
  - **`/flows`**: Defines the AI agents for forecasting and request analysis.
- **`/src/lib`**: Contains utility functions (`utils.ts`), mock data (`data.ts`), and TypeScript type definitions (`types.ts`).
- **`/src/hooks`**: Includes custom React hooks, such as `useLocalStorage` for mock data persistence and `useToast` for notifications.
- **`/public`**: Static assets.

This `README.md` should give you a great starting point for your GitHub repository.
