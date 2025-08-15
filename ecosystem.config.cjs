module.exports = {
  apps: [
    {
      name: 'linked marks', // A name for your application
      script: './dist/server/entry.mjs', // The entry point of your app
      // instances: 'max', // Run on all available CPU cores
      // exec_mode: 'cluster', // Enable cluster mode
      env: {
        // Environment variables
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 4321,
      },
    },
  ],
};