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
  webpack(config){
    config.module.rules.push({
      test: /\.svg$/,
      use:[{loader:'@svgr/webpack', options:{icons:true}}]
    })
    return config
  }
}
// domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'],
export default nextConfig;