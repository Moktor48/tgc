/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");


/** @type {import("next").NextConfig} */
const config = {    
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/avatars/267399228433760256/e411824740b4b71ac534fdeaaf7728a1.png',
      },
    ],
},};
 






export default config;
