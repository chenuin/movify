# Movify
[![Deploy to GitHub Pages](https://github.com/chenuin/movify/actions/workflows/deploy.yml/badge.svg)](https://github.com/chenuin/movify/actions/workflows/deploy.yml) [![Test on Deployment](https://github.com/chenuin/movify/actions/workflows/test.yml/badge.svg)](https://github.com/chenuin/movify/actions/workflows/test.yml)

> Movify is a modern, responsive web application for discovering and managing movies. It allows users to search for movies, filter by genre, add them to a watchlist, and explore content with an intuitive, infinite-scrolling interface.

## Tech Stack
 - **Frontend Framework:** React
 - **Language:** TypeScript
 - **Bundler:** Vite
 - **Data Fetching:** @tanstack/react-query
 - **HTTP Client:** ky
 - **UI Component Library:** Ant Design (antd)
 - **Routing:** react-router-dom

## Project

### Prerequisites
- Node.js (recommended v18 or higher)
- pnpm

### Steps

#### Installation of Dependencies
In the project's root directory, run the following command to install all necessary dependencies:
```bash
pnpm install
```

#### Environment variables
Copy `.env.example` to create a `.env` file and complete the environment variables.

#### Running the Project
Run the project in the local development environment:
```bash
pnpm dev
```
This will start a local development server. Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Test
Uses Vitest for component testing and Playwright for end-to-end testing..
```bash
pnpm test
```
```bash
pnpm e2e
```

### Eslint
Lints the source code to ensure consistent code style and identify potential issues.
```bash
pnpm lint
```
