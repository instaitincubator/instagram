/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'russian',
    locales: ['english', 'russian'],
  },
  images: {
    domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'],
  },
  reactStrictMode: true,
}
export default nextConfig;