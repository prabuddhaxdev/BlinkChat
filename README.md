# BlinkChat

<img width="1318" height="753" alt="blinkchat" src="https://github.com/user-attachments/assets/0c035e29-ab8a-4e9c-ace6-b7f68453f973" />


## 🚀 Overview
**BlinkChat** is a privacy-first, real-time chat web application built for **temporary and secure 1-on-1 conversations**. Chat rooms are designed to self-destruct automatically, ensuring messages are never stored permanently. With blazing-fast WebSocket communication and a lightweight backend, BlinkChat is perfect for anonymous, short-lived, and confidential chats.

Whether it’s quick collaboration, private discussions, or secret conversations — **BlinkChat disappears when you’re done.**

---

## ✨ Features

### 🔥 Real-time Messaging
- Instant message delivery powered by **WebSockets**
- No page refreshes — truly real-time communication

### 🕒 Auto-Destructing Rooms
- Chat rooms automatically **expire after 10 minutes**
- Ensures privacy and zero long-term data retention

### 💣 Manual Room Deletion
- Users can destroy chat rooms at any time
- Immediate removal of all messages and participants

### 👥 Two-User Limit
- Each room supports **only 2 participants**
- Designed for focused, private 1-on-1 conversations

### 🛡️ Privacy-First Architecture
- Messages are **not stored permanently**
- Rooms are isolated and short-lived by design

### ⚡ Ultra-Fast Backend
- Built with **Elysia on Bun** for exceptional performance
- Lightweight, low-latency server architecture

### 🧪 Validation & Safety
- Strong runtime validation using **Zod**
- Prevents malformed data and invalid room states

### 📱 Responsive & Minimal UI
- Clean, distraction-free interface
- Fully responsive across desktop and mobile devices

---

## 🧩 Use Cases
- 🔐 Secure 1-on-1 conversations  
- 🕵️ Anonymous private chats  
- 🤝 Temporary collaboration sessions  
- 💬 Self-destructing secret messages  

---

## 🛠️ Tech Stack

### Frontend
- **Next.js**
- **React JS** 
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query** (state management & caching)

### Backend
- **Elysia** (Bun framework)
- **Upstash Realtime** (WebSockets)
- **Upstash Redis** (ephemeral storage)
- **Zod** (schema validation)

