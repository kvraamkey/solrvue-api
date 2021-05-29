import express from 'express';
import * as http from "http";
import cors from "cors";
import setupRoutes from "./routes";

const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
    next();
};

/**
 * Express instance
 * @public
*/

const port = process.env.PORT || 8080;
const app = express();

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

setupRoutes(app);
app.use(errorHandler);

// create http server and wrap the express app
const server = http.createServer(app);

// important! must listen from `server`, not `app`, otherwise socket.io won't function correctly
server.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});
