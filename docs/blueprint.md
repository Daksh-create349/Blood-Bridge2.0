# **App Name**: Blood Bridge

## Core Features:

- Urgent Request AI: Use AI (Genkit flow) to analyze urgent blood requests, recommending optimal alert timing and scope as a tool. 
- AI Supply Forecasting: Employ AI (Genkit flow) to forecast blood supply based on historical data and upcoming events. Output includes predicted demand, shortage risk, and actionable recommendations. Uses LLM-based reasoning.
- Resource Inventory Dashboard: Display blood resource inventory data with filtering by blood type, location, and status, as well as alert summary cards. Uses localstorage.
- Urgent Request Submission: Form for hospitals to submit urgent blood requests with fields for Blood Type, Quantity, Urgency Level, Hospital Location and Donor Count. Display recommended AlertRecommendation.
- Active Request Display: Show active urgent blood requests in a card-based list. Displays relevant information with an 'I can donate' button.
- Donation Confirmation Dialog: Confirmation dialog when a user offers to donate, allowing them to select their blood bank.
- Analytics Charts: Generate analytics charts for inventory by blood type and status using Recharts.

## Style Guidelines:

- Background color: Dark gray (#23272F), providing a modern and sophisticated backdrop.
- Primary color: Vibrant red (#E44A4A) symbolizing urgency and blood, draws immediate attention.
- Accent color: Pale blue (#73D2DE) complements the red and signifies trust and reliability.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines, paired with 'Inter' (sans-serif) for body text, for a modern yet readable design. If computer code is displayed, use 'Source Code Pro'.
- Employ a sidebar navigation layout for all pages except the Welcome Page, enhancing user experience.
- Use subtle transitions and animations to enhance user interactions and provide feedback, such as loading skeletons during AI analysis.
- Utilize lucide-react icons throughout the interface to provide visual cues and enhance usability.