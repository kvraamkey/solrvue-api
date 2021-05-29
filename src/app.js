import express from 'express';
import * as http from "http";

/**
 * Express instance
 * @public
*/

const port = process.env.PORT || 8080;
const app = express();

app.get('/', function (req, res) {
    res.json('working');
});


// create http server and wrap the express app
const server = http.createServer(app);

// important! must listen from `server`, not `app`, otherwise socket.io won't function correctly
server.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});
