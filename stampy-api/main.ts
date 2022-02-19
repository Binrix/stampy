//const app = require("express");
import express from 'express';

const app = express();

app.get("/", (req: any, res: any) => {
    res.send("test");
});

app.listen(3000, () => console.log("Server is listening on port 3000"));

