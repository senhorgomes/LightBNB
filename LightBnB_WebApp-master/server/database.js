/// Users
const db = require('../db')
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
// const getUserWithEmail = function(email) {
//   let user;
//   for (const userId in users) {
//     user = users[userId];
//     if (user.email.toLowerCase() === email.toLowerCase()) {
//       break;
//     } else {
//       user = null;
//     }
//   }
//   return Promise.resolve(user);
// }
const getUserWithEmail = function(email) {
  const queryString = `
      SELECT * FROM users
      WHERE users.email = $1;
    `;
  return db.query(queryString, [`${email}`])
    .then(res => {if(res.rows) {
      return res.rows[0];
    }else {
      return null;
    }
  })
    .catch(err => { console.log('Uh oh, query error:', err)
  });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
    SELECT * FROM users
    WHERE users.id = $1;
  `;
  return db.query(queryString, [`${id}`])
    .then(res => {if(res.rows) {
      return res.rows[0];
    }else {
      return null;
    }
  })
    .catch(err => { console.log('Uh oh, query error:', err)
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString= `
    INSERT INTO users (name, password, email)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [`${user.name}`, `${user.password}`, `${user.email}`];
  return db.query(queryString, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return console.log('Uh oh, query error:', err);
    })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
      SELECT * FROM reservations
      WHERE guest_id = $1
    `;
  return db.query(queryString, [`${guest_id}`, limit])
    .then(res => {if(res.rows) {
      return res.rows[0];
    }else {
      return null;
    }
  })
    .catch(err => { console.log('Uh oh, query error:', err)
  });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // Setup an array to hold any parameters that may be available for the query.
  const queryParams = [];
  // Start the query with all information that comes before the WHERE clause.
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
  `;

  // Check if a city has been passed in as an option.
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    (queryParams.length - 1 !== 0) ? 
    (queryString += `AND city LIKE ${queryParams.length} `) : 
    (queryString += `WHERE city LIKE ${queryParams.length} `);
  }
  // if an owner_id is passed in, only return properties belonging to that owner.
  if (options.owner_id) {
    queryParams.push(`%${options.owner_id}%`) ;
    (queryParams.length - 1 !== 0) ?
    (queryString += `AND owner_id LIKE ${queryParams.length} `) : 
    (queryString += `WHERE owner_id LIKE ${queryParams.length} `);

  }

  // minimum and maximum price
  if (options.minimum_price_per_night && options.maximum_prie_per_night) {
    queryParams.push(options.minimum_price_per_night * 100, options.maximum_price_per_night * 100);
    (queryParams.length === 1) ?
    (queryString += `WHERE cost_per_night >= ${queryParams.length - 1} AND cost_per_night <= ${queryParams.length}`) :
    (queryString += `AND cost_per_night >= ${queryParams.length - 1} AND cost_per_night <= ${queryParams.length}`)
  }
  // Add any query that comes after the WHERE clause.
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  `;
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating)
    queryString += `AND rating >= ${queryParams.length}`
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT ${queryParams.length};
  `;
  // Console log everything just to make sure we've done it right.
  console.log(queryString, queryParams);

  // Run the query.
  return db.query(queryString, queryParams)
  .then(res => res.rows);
}
// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryString = `
      INSERT INTO properties (
        owner_id,
        title,
        description,
        thumbnail_photo_url,
        cover_photo_url,
        cost_per_night,
        parking_spaces,
        numebr_of_bathrooms,
        number_of_bedrooms,
        country,
        street,
        city,
        province,
        post_code
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
    `;
    const values = [
      property.owner_id,
      property.title,
      property.description,
      property.thumbnail_photo_url,
      property.cover_photo_url,
      property.cost_per_night,
      property.parking_spaces,
      property.numebr_of_bathrooms,
      property.number_of_bedrooms,
      property.country,
      property.street,
      property.city,
      property.province,
      property.post_code
    ];
  return db.query(queryString, values)
  .then(res => {
    return res.rows[0];
  })
  .catch(err => {
    return console.log('Uh oh, query error:', err);
  })
}
exports.addProperty = addProperty;
