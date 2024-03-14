import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();


const PORT = 1309;
const urlProxy = process.env.PorxyImage || "http://localhost:2404/";

const app = express();

app.get("/", async (req, res) => {
    if (req.url === "/") {
        res.send("You need add url request!");
    } else {
        const url = new URL(req.url.slice(2));
        const urlImage = String(url);
        const regex = /referer/i;
        const Position = urlImage.search(regex);
        var referer = urlImage.slice(Position + 8);
        const rqBody = req.body;
        const rqMethod = req.method;
        try {
            const response = await fetch(urlProxy + url, {
                headers: {
                    referer: referer,
                },
                body: rqBody,
                method: rqMethod,
            });
            res.writeHead(response.status, response.headers);
            response.body.pipe(res);
        } catch (err) {
            console.error(err);
            res.writeHead(500);
            res.end(err.toString());
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
