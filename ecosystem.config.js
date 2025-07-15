module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm",
      args: "run start",
      env: {
        PORT: 3001,
        NODE_ENV: "production"
      }
    }
  ]
}
