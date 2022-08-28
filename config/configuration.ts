export const configuration = () => ({
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 5001,
  GOOGLE_MAPS_ACCESS_KEY: process.env.GOOGLE_MAPS_ACCESS_KEY,
});
