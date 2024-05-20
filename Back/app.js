const http = require('http');
const { registerRoutes, lookup } = require("./routes/routes")

const server = http.createServer((req, res) => {
    lookup(req, res);
});
 
(() => {
    registerRoutes()

    server.listen(3001, err => {
        if(err) {
            console.log(err);
        } else {
            console.log("Listening on port 3001");
        }
    })
})()