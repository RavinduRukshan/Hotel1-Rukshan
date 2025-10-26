# MongoDB Atlas Setup Guide

Your application is trying to connect to MongoDB Atlas but is being blocked by IP whitelist restrictions. Follow these steps to fix it:

## Steps to Configure MongoDB Atlas:

1. **Log in to MongoDB Atlas**
   - Go to https://cloud.mongodb.com/
   - Sign in with your account

2. **Whitelist Replit IP Addresses**
   - In your Atlas cluster, click on "Network Access" in the left sidebar
   - Click "Add IP Address"
   - **Option A (Recommended for development):** Click "Allow Access from Anywhere" and add `0.0.0.0/0`
   - **Option B (More secure):** Add specific Replit IP ranges (contact Replit support for current IPs)
   - Click "Confirm"

3. **Verify Connection String**
   - Click on "Database" in the left sidebar
   - Click "Connect" button on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Make sure it's in your Replit Secrets as `MONGODB_URI`
   - Format should be: `mongodb+srv://username:password@cluster.mongodb.net/hotel-db?retryWrites=true&w=majority`

4. **Wait for Changes to Apply**
   - IP whitelist changes can take 1-2 minutes to propagate
   - Once applied, restart your application

## After Configuration:

Run the seed script to populate your database with sample data:

```bash
npx tsx server/scripts/seed.ts
```

This will create:
- 5 sample rooms with images and pricing
- Admin user: `admin@example.com` / `Admin123!`
- 2 sample reservations

## Troubleshooting:

- If still getting connection errors, verify your MongoDB Atlas username and password
- Make sure your cluster is active (not paused)
- Check that the database name in the connection string matches your intended database
