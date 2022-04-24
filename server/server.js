require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//Get All Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    const results = await db.query("SELECT * FROM restaurants")
    console.log(results);

    res.status(200).json({
        status: "success",
        data: {
            restaurants: ["McDonalds", "Wendys"]
        },
    });
});

//Get A Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params)
});

//Create A Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req)
});

//Update A Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    res.status(200).json({
        status: "success",
        data: {
            restaurants: ["McDonalds", "Wendys"]
        },
    });
});

//Delete A Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    res.status(204).json({
        status: "success",
    });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
