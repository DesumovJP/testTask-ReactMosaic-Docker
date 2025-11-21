# Imagino Dashboard

A responsive dashboard application displaying company information using React Mosaic layout with three resizable widgets.

## Overview

This application provides a dashboard interface with three company information widgets arranged in a resizable mosaic layout. Users can select a company ticker from a dropdown to display detailed company information across all widgets.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Mosaic** - Resizable tile layout
- **Express** - Fake API server
- **Node.js** - Runtime

## Fake API

The application includes a simple Express server that serves company data from `server/data/companies-lookup.json`.

### Endpoints

- `GET /api/companies` - Returns all companies
- `GET /api/companies/:ticker` - Returns a specific company by ticker

The server runs on port 3001 by default (configurable via `PORT` environment variable) and includes CORS configuration for local development.

## Project Structure

```
imagino-dashboard/
├── src/
│   ├── app/
│   │   └── App.tsx
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── widgets/
│   │   │   ├── CompanyInfoWidget.tsx
│   │   │   └── WidgetShell.tsx
│   │   └── ui/
│   │       ├── Dropdown.tsx
│   │       ├── Card.tsx
│   │       └── Spinner.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── types.ts
│   ├── styles/
│   │   ├── index.css
│   │   └── mosaic.css
│   └── main.tsx
├── server/
│   ├── index.ts
│   └── data/
│       └── companies-lookup.json
├── public/
├── Dockerfile
└── README.md
```

## How to Run

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

```bash
yarn install
```

### Development

Start the API server in one terminal:

```bash
yarn server
```

Start the development server in another terminal:

```bash
yarn dev
```

The application will be available at `http://localhost:5173` and the API at `http://localhost:3001`.

### Build

```bash
yarn build
```

The production build will be in the `dist` directory.

### Preview

```bash
yarn preview
```

## Scripts

- `yarn dev` - Start Vite dev server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn server` - Start Express API server
- `yarn lint` - Run ESLint

## Docker

Build the Docker image:

```bash
docker build -t imagino-dashboard .
```

Run the container:

```bash
docker run -p 3001:3001 imagino-dashboard
```

The application will be available at `http://localhost:3001`.

## Design Decisions

- **Dark Theme**: Implemented a dark theme with glass morphism effects for a modern look
- **Mosaic Layout**: Used React Mosaic for a flexible, resizable dashboard layout
- **Type Safety**: Full TypeScript implementation with strict mode enabled
- **Error Handling**: Comprehensive error states with retry functionality
- **Loading States**: Spinner components for better UX during data fetching
- **Responsive Design**: Tailwind CSS utilities for responsive layouts

## Limitations

- The fake API serves static data from JSON files
- No authentication or authorization
- No data persistence (mosaic layout state is not saved)
- Limited to the companies available in the JSON data file

## Notes

- The application uses a single ticker selection that updates all three widgets simultaneously
- Widgets are fully resizable and can be rearranged using React Mosaic's drag-and-drop functionality
- The design follows a minimalistic approach with consistent spacing and color scheme
