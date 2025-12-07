# Institute for Behavior and Learning

A comprehensive website for disability support services.

## Features
- Responsive design
- User authentication
- Service information
- Contact forms
- Admin dashboard

## Deployment
Deployed on Vercel with MongoDB Atlas

## Running the backend locally

1. Install dependencies from the `server` directory:

   ```bash
   cd server
   npm install
   npm start
   ```

2. The API will start on port 5000 by default. Verify it by visiting `http://localhost:5000/api/health`.

3. If your frontend runs from a different origin, set `FRONTEND_URL` to that full URL (or `*` to allow any origin) so CORS headers are applied correctly.
