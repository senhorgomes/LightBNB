SELECT properties.city as name, count(reservations.*) as total_reservations
FROM properties
JOIN reservations ON properties.id = property_id
GROUP BY properties.city
ORDER BY count(reservations.*) DESC;
