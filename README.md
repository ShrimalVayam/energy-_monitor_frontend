# 🔋 Smart Home Energy Monitoring System – Frontend

## This is the frontend SPA for the Smart Home Energy Monitoring System. It provides a modern, responsive UI for user authentication, energy usage visualization, and interacting with the AI chatbot to ask natural-language questions.

🖥️ Tech Stack

## Vite + React

## TypeScript

## Tailwind CSS

## Axios

## Charting Library (Chart.js)

🌐 Features
Single-page application (SPA) in **Vite + React**, including:

- 🔐 User Auth: Login & registration screens
- 📱 Device List: View all registered energy-consuming devices
- 📈 Dashboard: Visual energy insights with 7-day usage chart
- 💬 AI Chatbot: Ask questions

## 📁 Project Structure

```
├── frontend/
│   ├── .env
│   ├── package.json
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── schemas/
│       ├── services/
│       ├── types/
│       ├── App.tsx
│       └── main.tsx
├── README.md
```

## ⚙️ Environment Variables

````env.example

VITE_AUTH_API=http://your-auth-service-url/api/v1
VITE_DEVICE_API=http://your-device-service-url/api/v1
VITE_CHATBOT_API=http://your-chatbot-service-url/api/v1

---

## Running the App

```Install dependencies

 -  pnpm install

```Start the  server

 - pnpm run dev


```Testing

 - pnpm test


## 📜 License

MIT
````

## ⚙️ Screenshots

### AI & Analytics

![AI Assistant](src/assets/images/ai-assistant.png)
![Analytics by Device](src/assets/images/analytics-by-device.png)
![Analytics by Room](src/assets/images/analytics-by-room.png)
![Analytics Overview](src/assets/images/analytics-overview.png)
![Analytics Trends](src/assets/images/analytics-trends.png)

### Architecture & Devices

![Architectural Diagram](src/assets/images/architectural-diagram.png)
![Create Device](src/assets/images/create-device.png)
![Dashboard](src/assets/images/dashboard.png)
![Device Detail](src/assets/images/device-detail.png)
![Device List](src/assets/images/device-list.png)

### Auth & Telemetry

![Telemetry](src/assets/images/telemetry.png)
