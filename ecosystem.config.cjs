module.exports = {
  apps: [
    {
      name: "tgc-next",
      script: "npm",
      args: "start",
      cwd: "/home/moktor/PROJECT/tgc/",
      watch: true,
      env: {
        NODE_ENV: "production",
      }
    },
  ]
};

