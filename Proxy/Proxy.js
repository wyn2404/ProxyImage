import { createServer } from "http";
import fetch from "node-fetch";

const PORT = process.env.PORT || 2404;

createServer(async (req, res) => {
    try {
        const url = req.url.slice(1);
        if (url !== "") {
            const response = await fetch(url, {
                headers: {
                    referer: req.headers.referer,
                },
            });
            res.writeHead(response.status, response.headers);
            response.body.pipe(res);
        }
    } catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end(err.toString());
    }
}).listen(PORT, () => {
    console.log(
        `Image proxy server running. Access it at: http://localhost:${PORT}`
    );
});
