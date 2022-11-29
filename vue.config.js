module.exports = {
  // pages: {
  //   index: {
  //     //入口
  //     entry: "src/main.js",
  //   },
  // },
  devServer: {
    // open:true,
    // port:8080,
    // https:false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { 
          '^/api': ''
        },
        //ws: true,
      }
    }
  },
  lintOnSave: false,
}