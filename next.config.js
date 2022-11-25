const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

//const isProduction = process.env.NODE_ENV === 'production'

module.exports = withStoreConfig({
  output: 'export',
  experimental: { esmExternals: true },
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com", "localhost", "storage.googleapis.com"],
    unoptimized: true,
    //unoptimized: isProduction ? false : true,
    //loader: isProduction ? 'custom' : 'default',
    //loaderFile: './src/lib/loader/cloudfare.js',
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
