module.exports = {
    apps : [{
      name   : "vector-2-svg",
      script : "./src/app.js",
      watch : false,
      exec_mode: 'fork',
      env : {
        NODE_ENV: "production"
      }
    }]
  }
  