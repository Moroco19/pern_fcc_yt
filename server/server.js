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
        const results = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id ORDER BY id ASC");
        console.log(results);
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
        const restaurant = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1", [req.params.id]);
        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [req.params.id]);
        // console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: restaurant.rows[0],
                reviews: reviews.rows
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

//Add A Review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try { 
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *", 
        [req.params.id, req.body.name,req.body.review, req.body.rating]);
        console.log(newReview)
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0],
            }
        });
    } catch(err) {
        console.log(err);
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
