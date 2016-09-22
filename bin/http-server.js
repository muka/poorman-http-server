#!/usr/bin/env node

var fs = require('fs');

var args = process.argv;

var express = require('express');

var dirArg = args[2];
var portArg = args[3];

if(parseInt(dirArg)+"" === dirArg) {
  portArg = dirArg;
  dirArg = "./"
}

var dir = dirArg ? dirArg : './'

var path = require('path');
dir = path.resolve(dir)

if(!fs.existsSync(dir)) {
  console.error("Directory does not exists: %s", dir);
  process.exit(1);
}

var port = portArg ? portArg : '3000';
var _p = port.split(':')

var host = 'localhost';
if(_p.length > 1) {
  host = _p[0];
  port = _p[1];
}


var index = [ 'index.html','index.htm', ];
while(index.length) {

  var idx = path.resolve('./' + index.pop());
  if(fs.existsSync()) {
    app.get('/', express.static(idx));
    break;
  }
}

var app = express();
app.use(express.static(dir));
try {
  app.listen(port, host, function() {
    console.log("Serving %s at http://%s:%s", dir, host, port);
  });
}
catch(e) {
  console.error(e.message);
  process.exit(1);
}
