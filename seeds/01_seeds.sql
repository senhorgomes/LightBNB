---USERS
INSERT INTO users (name, email, password) VALUES ('Sebastian', 'replicant_maker@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Roy Batty', 'not_a_replicant@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Pris', 'also_not_a_replicant@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

---properties
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (1, 'Sebastians Apartment', 'description', 'img.ca/1', 'img.ca/2', 60, 0, 1, 2, 'Canada', 'Random Street', 'Toronto', 'Ontario', 'A1A1A1', DEFAULT);
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (1, 'Sebastians Cottage', 'description', 'img.ca/3', 'img.ca/4', 200, 2, 1, 2, 'Canada', 'Random Avenue', 'Muskoka', 'Ontario', 'B2B2B2', DEFAULT);
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (1, 'Sebastians House', 'description', 'img.ca/5', 'img.ca/6', 150, 1, 2, 3, 'Canada', 'Random Road', 'York', 'Ontario', 'C3C3C3', DEFAULT);

---reservations
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2019-11-12', '2019-11-14', 1, 2);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2020-02-01', '2020-02-05', 2, 2);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2020-01-19', '2020-01-29', 3, 3);

---property_reviews
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (2, 1, 1, 5, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (2, 2, 2, 5, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (3, 3, 3, 3, 'message');