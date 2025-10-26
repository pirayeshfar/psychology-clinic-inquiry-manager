# Psychology Clinic Inquiry Manager (PCIM)

A secure and confidential platform for clients to submit inquiries to a psychology clinic. This system ensures complete anonymity between clients and therapists, acting as a blind intermediary to protect privacy. It also features an AI-powered assistant (using the Google Gemini API) to help therapists draft supportive initial responses.

This application was designed and developed by **Amir Saman Pirayeshfar**.

---

## Core Features

-   **Confidential Inquiry Form**: A simple and secure form for clients to submit their concerns without needing to create an account.
-   **Anonymous Communication**: The system forwards communications without revealing the client's or therapist's direct email addresses, ensuring privacy for both parties.
-   **Role-Based Views**:
    -   **Patient View**: Access to the inquiry submission form.
    -   **Therapist View**: A dedicated dashboard to view assigned inquiries, read client descriptions, and write confidential responses.
    -   **Admin View**: A high-level dashboard with statistics and a complete log of all inquiries for oversight.
-   **AI-Powered Response Assistant**: Therapists can leverage the power of Google's Gemini model to generate an empathetic, non-prescriptive draft response. This helps save time and ensures a consistent, supportive tone in initial communications.
-   **Secure & Private by Design**: Built with the core principle of protecting sensitive client information.

## How It Works

1.  **Submission**: A client visits the platform, fills out the confidential form with their email (for receiving a reply), selects a service type, and describes their issue.
2.  **Assignment**: The system receives the inquiry and automatically assigns it to the appropriate therapist based on the selected service type.
3.  **Response**: The therapist logs into their dashboard, views the anonymous inquiry, and can write a response. They have the option to use the AI assistant to generate a helpful starting draft.
4.  **Delivery**: Once the therapist submits their response, the system sends it to the client's email address from a generic clinic email, maintaining the therapist's anonymity.

## Project Overview

This project is a single-page application built with React and TypeScript, demonstrating a complete workflow for a confidential inquiry management system. It is designed to run in an environment where the Google Gemini API key is provided as an environment variable (`process.env.API_KEY`).

The application is structured into several key components:
-   `App.tsx`: The main component that manages state and routing between different views.
-   `components/`: Contains UI components for each view (Inquiry Form, Therapist Dashboard, Admin Dashboard).
-   `services/geminiService.ts`: Handles all interactions with the Google Gemini API.
-   `types.ts`: Defines the data structures and types used throughout the application.

## Credits

Designed and Developed by **Amir Saman Pirayeshfar**.
