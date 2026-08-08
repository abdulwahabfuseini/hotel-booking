# Grand Horizon Hotel — Management System

A professional hotel booking and management application built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

## Features

### Guest-Facing
- **Landing page** with hero, amenities, and featured rooms
- **Room catalog** with search and filters (type, price, capacity)
- **Room detail pages** with galleries and amenities
- **Booking flow** with date selection, guest info, and pricing summary
- **Booking confirmation** page with confirmation number

### Admin Dashboard
- **Dashboard** with revenue, occupancy, and activity metrics
- **Bookings management** — view and update booking statuses
- **Rooms management** — update room availability status
- **Guest directory** with loyalty tiers and search
- **Settings** — hotel info, policies, and data reset

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) — icons
- [date-fns](https://date-fns.org/) — date utilities

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Routes

| Route | Description |
|-------|-------------|
| `/` | Public homepage |
| `/rooms` | Browse all rooms |
| `/rooms/[id]` | Room details |
| `/book` | Make a reservation |
| `/book/confirmation` | Booking confirmation |
| `/admin` | Admin dashboard |
| `/admin/bookings` | Manage bookings |
| `/admin/rooms` | Manage rooms |
| `/admin/guests` | Guest directory |
| `/admin/settings` | Hotel settings |

## Data Persistence

Booking data is persisted in the browser's `localStorage`. Use **Reset All Data** in Admin → Settings to restore defaults.

## Build

```bash
npm run build
npm start
```
