/** @type {import('next').NextConfig} */
const nextConfig = {
   
// Essential for dynamic routes
reactStrictMode: true,

// Enable proper API route handling
// async headers() {
//     return [
//       {
//         source: '/api/:path*',
//         headers: [
//           { key: 'Access-Control-Allow-Origin', value: '*' },
//           { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' }
//         ]
//       }
//     ]
//   },

};

export default nextConfig;
