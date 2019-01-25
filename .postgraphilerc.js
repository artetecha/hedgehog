const db = JSON.parse(Buffer.from(process.env.PLATFORM_RELATIONSHIPS, "base64").toString()).pg[0];

module.exports = {
  options: {
    connection: `postgres://${db.username}:${db.password}@${db.host}:${db.port}/${db.path}`,
    // Recommended to be off in production.
    disableQueryLog: process.env.PLATFORM_BRANCH === "master",
    // Recommended to be off in production.
    disableGraphiql: process.env.PLATFORM_BRANCH === "master",
    // Enable `watch` only in development. First, the watch flag requires either
    // that the app has root access to PostgreSQL for a one-time set up of the feature
    // or the manual set up of the same. Second, the schema on the remotely
    // deployed environments will only be updated via deployments, thus changes
    // can be applied before the application starts, at which point the correct
    // schema will be loaded.
    watch: typeof process.env.PLATFORM_BRANCH === "undefined",
    port: process.env.PORT,
    host: "0.0.0.0",
    simpleCollections: "both",
    graphql: "/",
    legacyRelations: "omit",
    appendPlugins: [
      "postgraphile-plugin-connection-filter",
      "postgraphile-plugin-nested-mutations",
      "postgraphile-artetecha-inflector",
    ],
  },
  // The above 'options' is the only key PostGraphile will require.
  // Others are ignored, but still safe to be added. So exporting 'db'
  // here to avoid code duplication.
  db,
};
