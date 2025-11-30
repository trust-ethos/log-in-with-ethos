# Log in with Ethos

A minimal example app demonstrating how to integrate **Ethos Network** authentication using **Privy** in a React application.

This allows users to log in with their Ethos identity.

## Prerequisites

- [Deno](https://deno.land/) installed
- A [Privy](https://privy.io/) account

## Setup Guide

### 1. Create a Privy App

1. Go to [Privy Dashboard](https://dashboard.privy.io/)
2. Create a new app or select an existing one
3. Copy your **App ID** from the dashboard

### 2. Enable Ethos Network Integration

1. In your Privy Dashboard, go to **Global Settings** → **Integrations**
2. Find **Ethos Network** and enable it for authentication
3. This allows users to log in with their Ethos identity

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
VITE_PRIVY_APP_ID=your-privy-app-id-here
```

Replace `your-privy-app-id-here` with your actual Privy App ID.

## Running Locally

### Install Dependencies

```bash
deno install
```

### Start Development Server

```bash
deno task dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
deno task build
```

## Resources

- [Ethos API Docs](https://developers.ethos.network/)
- [Privy Docs](https://docs.privy.io/)
- [Privy React Setup](https://docs.privy.io/basics/react/setup)
