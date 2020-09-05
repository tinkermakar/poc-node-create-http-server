// const http = require("http");
const { createServer } = require("http");
const fs = require("fs");
const { decode } = require("querystring"); // I got this in terminal via post before adding this module: "firstname=asd&lastname=asd&age=222&submit=Submit"

// Simple server displaying HTML file only on port 7777
createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("./index.html").pipe(res);
}).listen(7777);


// Full website server
const sendFile = (res, status, type, filePath) => {
  res.writeHead(status, { "Content-Type": type});
  fs.createReadStream(filePath).pipe(res);
}

createServer((req, res) => {
  if (req.method === "POST") {
    let fromPOST = "";
    req.on("data", data => {
      fromPOST += data;
    });
    req.on("end", () => {
      console.log(decode(fromPOST)); // ATTENTION decode module is used here.

      const { firstname, lastname, age } = decode(fromPOST);
      console.log(`Message from ${firstname} ${lastname}, ${age} years old.`); // ATTENTION decode module is used here

    })
  }
  
  switch(req.url) {
    case "/": return sendFile(res, 200, "text/html", "./index.html");
    case "/style.css": return sendFile(res, 200, "text/css", "./style.css");
    case "/images/2019/hello.jpg": return sendFile(res, 200, "image/jpg", "./hello.jpg");
    case "/handlebars-v4.2.0.js": return sendFile(res, 200, "text/javascript", "./handlebars-v4.2.0.js");
  }

  fs.createReadStream("./index.html").pipe(res);

  
}).listen(8888);
console.log('>>> site running on port 8888.');

