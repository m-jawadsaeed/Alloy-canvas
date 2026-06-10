# Alloy Canvas

## Project Overview
Alloy Canvas is a real-time collaborative whiteboard and chat application built with a React frontend, Node.js/Express backend, Socket.IO, PostgreSQL, and Prisma.

### Features
- User Authentication (Register/Login)
- JWT Authentication
- Room Creation & Management
- Real-time Chat
- Real-time Collaborative Whiteboard
- Canvas Persistence
- User Presence
- Invite Links
- Activity Feed
- Export Canvas as PNG
- Protected Routes

---

# Tech Stack

## Frontend
- React
- TypeScript
- Vite
- React Router DOM
- Axios
- Socket.IO Client
- Zustand

## Backend
- Node.js
- Express
- TypeScript
- Socket.IO
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

---

## Main Modules

### Auth
- Register
- Login
- Refresh Token
- Logout

### Rooms
- Create Room
- Get Rooms
- Room Details
- Room Members

### Chat
- Send Message
- Fetch Messages

### Canvas
- Save Canvas
- Load Canvas
- Sync Drawing

### Socket Events
- join-room
- send-message
- receive-message
- draw
- cursor-move
- canvas-clear
- activity

---

# Prisma Models

- User
- Room
- RoomMember
- Message
- Canvas
- RefreshToken

Relationships:
- User ↔ Room (Many-to-Many via RoomMember)
- Room ↔ Message
- Room ↔ Canvas
- User ↔ Message

---

## Pages

### Login
User authentication page.

### Register
User registration page.

### Dashboard
Displays available rooms.

### CreateRoom
Creates collaborative room.

### Room
Main collaborative workspace.

---

# Components

## Whiteboard
Handles:
- Pencil Tool
- Rectangle Tool
- Circle Tool
- Line Tool
- Text Tool
- Undo
- Clear Canvas

## Chat
Handles room chat.

## UsersList
Displays connected users.

## Toolbar
Canvas tools.

## CursorLayer
Real-time cursor presence.

## InviteModal
Share room link.

## ActivityFeed
Room activity history.

## Minimap
Canvas navigation preview.

---

# Stores

## auth.store.ts
Stores logged-in user.

## canvas.store.ts
Stores canvas elements and selection state.

---

# API Endpoints

## Auth

POST /api/auth/register

POST /api/auth/login

POST /api/auth/refresh

POST /api/auth/logout

## Rooms

GET /api/rooms

POST /api/rooms

GET /api/rooms/:id

## Chat

GET /api/chat/:roomId

POST /api/chat

## Canvas

GET /api/canvas/:roomId

POST /api/canvas/:roomId

---

# Environment Variables

## Backend .env

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/alloy_canvas

JWT_SECRET=your_secret

JWT_REFRESH_SECRET=your_refresh_secret

PORT=5000
```

## Frontend .env

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Running Project

## Backend

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Frontend

```bash
npm install
npm run dev
```

---

# Docker

```bash
docker compose up -d
```

---

# Future Improvements

- Shape Selection
- Shape Resize
- Drag & Drop Objects
- Role-based Permissions
- File Uploads
- Canvas Versioning
- Notifications
- Mobile Support

---

# Project Flow

1. User Registers/Login
2. User Creates Room
3. User Joins Room
4. Socket Connection Established
5. Users Draw on Canvas
6. Canvas Syncs in Real-Time
7. Messages Sync in Real-Time
8. Canvas Saved to Database
9. Users Share Invite Link

---

# Author

Alloy Canvas - Week 4 Main Project
