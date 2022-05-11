require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Get All Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants");
        //console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

//Get A Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    //console.log(req.params)
    try {
        const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
        console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: results.rows[0],
            },
        });
    } catch(err) {
        console.log(err);
    }
});

//Create A Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body)
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values($1, $2, $3) RETURNING *",
        [req.body.name, req.body.location, req.body.price_range]);
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurants: results.rows[0],
            }
        })
    } catch(err) {
        console.log(err);
    }
});

//Update A Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
        [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: results.rows[0],
            },
        });
    } catch(err) {
        console.log(err);
    }
});

//Delete A Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    } catch(err) {
        console.log(err);
    }

});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
