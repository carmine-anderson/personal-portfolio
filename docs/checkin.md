# 🌱 Daily Check-In App

The **Daily Check-In App** is a lightweight, personalized web application that allows a single user to submit a daily check-in form. Submissions are securely stored and automatically emailed each day. This project was designed to be simple, fast, and cost-effective while leveraging modern, free-tier technologies.

---

## 🚀 Project Overview
The goal of this app was to create a beautiful and private way for my significant other to submit a single daily check-in. Each response is stored in a database and automatically triggers an email notification, keeping everything streamlined and personal.

Key features include:
- A **secure login screen** with lightweight password protection.
- A **single user form** for daily check-ins.
- **Automatic email notifications** when a check-in is submitted.
- A **gratitude journal** feature to track gratitude entries over time. (Still in Progross)
- Fully responsive UI built with **React + TypeScript**.
- **Free hosting and backend services**, making the app zero-cost to maintain.

---

## 🛠 Tech Stack

| Technology    | Purpose |
|---------------|---------|
| **React + Vite + TypeScript** | Frontend framework and tooling for a fast, modern UI |
| **Supabase** | Backend-as-a-Service for database, authentication, and APIs |
| **Resend** | Email service to send notifications (3000 free emails/month) |
| **GitHub Pages** | Free hosting for static frontend deployment |
| **Netlify Functions** | For lightweight serverless logic |

---

## 🗂 Folder Structure

The project was designed to be modular and easy to maintain:
```
project-root/
│
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable React components
│ │ ├── CheckInForm.tsx
│ │ ├── GratitudeCorner.tsx
│ │ ├── Login.tsx
│ │ └── Dashboard.tsx
│ │
│ ├── App.tsx # Main app container
│ ├── main.tsx # Entry point
│ └── styles/ # Global styles
│
├── package.json
├── vite.config.ts
└── README.md
```


---

## 🗄 Database Setup (Supabase)

I used **Supabase** to handle authentication and data storage.  
Below are the tables I created:

### 1. `users` table
Stores login credentials for the single user.

| Column      | Type      | Notes             |
|-------------|-----------|-------------------|
| id          | uuid      | Primary key       |
| email       | text      | Unique login email|
| password    | text      | Securely hashed   |

### 2. `checkins` table
Stores daily check-in form submissions.

| Column      | Type      | Notes                       |
|-------------|-----------|-----------------------------|
| id          | uuid      | Primary key                 |
| user_id     | uuid      | Foreign key to `users` table|
| mood        | text      | User's daily mood            |
| notes       | text      | Additional comments          |
| created_at  | timestamp | Auto-set on insert           |

### 3. `gratitude` table
Stores gratitude entries.

| Column      | Type      | Notes                       |
|-------------|-----------|-----------------------------|
| id          | uuid      | Primary key                 |
| user_id     | uuid      | Foreign key to `users` table|
| entry       | text      | Gratitude text               |
| created_at  | timestamp | Auto-set on insert           |

---

## 💌 Email Notifications (Resend)

I integrated **Resend** to send email notifications whenever a check-in is submitted.  

### Example email payload:

```typescript
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

async function sendCheckInEmail(data: { mood: string; notes: string }) {
  await resend.emails.send({
    from: 'Daily Check-In <no-reply@dailycheckin.app>',
    to: 'myemail@example.com',
    subject: 'New Daily Check-In Submitted',
    html: `
      <h1>New Check-In</h1>
      <p><strong>Mood:</strong> ${data.mood}</p>
      <p><strong>Notes:</strong> ${data.notes}</p>
      <p>Submitted on ${new Date().toLocaleString()}</p>
    `
  });
}
```
This function is triggered right after a successful check-in is saved to Supabase.

## 🔒 Lightweight Authentication

I implemented a simple password-based login on the frontend to restrict access to people without the password.

My goal is to create a more strict lightweight authentication service using Supabase where:

- When a user logs in, a session token is kept in localStorage.

- A Logout button clears the session and redirects back to the login screen.

With example login logic such as:
```typescript
async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  localStorage.setItem('session', JSON.stringify(data.session));
}
```

## 🌐 Deployment

I chose GitHub Pages for hosting since it's free and integrates nicely with GitHub Actions.

## 🖼 Key Features Demonstration

1. Daily Check-In Form

Simple and intuitive interface to submit a daily entry.
```tsx
<CheckInForm
  onSubmit={(data) => {
    saveCheckIn(data);  // saves to Supabase
    sendCheckInEmail(data);  // sends notification
  }}
/>
```
2. Gratitude Corner

Although still in production, this will display a running list of gratitude entries with timestamps, such as:
```tsx
<GratitudeCorner entries={gratitudeEntries} />
```
Example Output:
```arduino
📝 "Grateful for coffee and a productive morning!" - 2025-09-09
🌞 "Sunshine after a rainy week." - 2025-09-08
❤️ "Quality time with family." - 2025-09-07
```

## 📌 Summary
The Daily Check-In App demonstrates how to build a personalized, full-stack web app entirely with free-tier services. It’s lightweight, fast, 
and designed with a strong focus on privacy and user experience. This project taught us about deploying production-ready software with minimal overhead, 
while still having fun building something meaningful.