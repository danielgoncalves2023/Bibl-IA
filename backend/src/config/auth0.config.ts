import { registerAs } from '@nestjs/config';

export default registerAs('auth0', () => ({
  domain: process.env.AUTH0_DOMAIN || 'dev-ppu3k1wrmgibvb3x.us.auth0.com',
  audience: process.env.AUTH0_AUDIENCE || 'https://api.example.com',
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
}));
