# Log in with Ethos

A minimal example app demonstrating how to integrate **Ethos Network** authentication using **Privy** in a React application.

## Overview

This example shows how to implement **Log in with Ethos** — a cross-app authentication flow that allows users to sign in with their Ethos identity.

When a user logs in with Ethos, you receive their **Ethos Everywhere wallet address**. This is a unified wallet tied to their Ethos profile that works across all Ethos-integrated applications.

### What you get after login

After successful authentication, you can access the user's Ethos Everywhere wallet address from Privy's linked accounts:

```typescript
const { user } = usePrivy()
const linkedAccount = user?.linkedAccounts?.find(({ type }) => type === 'cross_app')
const ethosWalletAddress = linkedAccount?.embeddedWallets?.[0]?.address
```

### Fetching user profile

Once you have the wallet address, you can fetch the user's Ethos profile using the [Ethos Everywhere Wallet API endpoint](https://developers.ethos.network/api-documentation/api-v2/users#get-user-by-ethos-everywhere-wallet-address):

```bash
GET https://api.ethos.network/api/v2/user/by/ethos-everywhere-wallet/{address}
```

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

- [Ethos Developer Docs](https://developers.ethos.network/)
- [Log in with Ethos Guide](https://developers.ethos.network/api-documentation/log-in-with-ethos)
- [Ethos Everywhere Wallet API](https://developers.ethos.network/api-documentation/api-v2/users#get-user-by-ethos-everywhere-wallet-address)
- [Privy Docs](https://docs.privy.io/)
- [Privy React Setup](https://docs.privy.io/basics/react/setup)
