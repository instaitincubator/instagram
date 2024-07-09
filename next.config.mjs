/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'russian',
    locales: ['english', 'russian'],
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
export default nextConfig;