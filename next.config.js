/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'ui-avatars.com',
      'lkrivozuvxhmbcgjdacp.supabase.co'
    ]
  }
}

module.exports = nextConfig
