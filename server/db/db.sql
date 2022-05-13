CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) values (1, 'Joann', 'Average restuarant', 3);
INSERT INTO reviews (restaurant_id, name, review, rating) values (1, 'Naomi', 'Average restuarant', 3);
INSERT INTO reviews (restaurant_id, name, review, rating) values (1, 'Ryota', 'Average restuarant', 3);
INSERT INTO reviews (restaurant_id, name, review, rating) values (2, 'Rina', 'Average restuarant', 4);