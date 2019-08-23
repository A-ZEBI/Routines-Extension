var express = require('express');
//var serveStatic = require('serve-static');
//var serveIndex = require('serve-index');
const fs = require('fs');

//var app = express();

var config = {
  host: "localhost",
  publicPath: "dist"
};
//var baseUrl = "http://" + config.host + ":" + config.port + "/" + config.publicPath + "/";
var baseUrl = "http://" + config.host + "/" + config.publicPath + "/";

//app.use(express.static('./'), serveIndex('./', {'icons': true}));
//app.listen(config.port);


console.log("Server run on " + baseUrl + "\n");

fs.readdir('dist', (err, files) => {
  files.forEach(file => {
    if (file.search(/\.html/) > 0) {
      console.log(file.replace('.html', '') + " : " + baseUrl + file)
    }
  });
  console.log("");
  console.log("");
  console.log("");
});

fs.readdir('dist', (err, files) => {
  files.forEach(file => {
    if (file.search(/\.html/) > 0) {
      console.log(file.replace('.html', '') + " : " + "https://orange.numendo.com/dist/" + file)
    }
  });
});
