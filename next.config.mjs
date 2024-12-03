/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/questions',
        destination: 'https://opentdb.com/api.php',
      },
    ];
  },
};

export default nextConfig;
