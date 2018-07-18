const spicedPg = require("spiced-pg");
let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:dennis:password@localhost:5432/imageboard");
}

exports.getImages = function() {
    const query = `SELECT * FROM images ORDER BY created_at DESC;`;

    return db.query(query).then(results => {
        return results.rows;
    });
};

exports.addImage = function(url, username, title, description) {
    const options = [url, username, title, description];
    const query = `INSERT INTO images (url, username, title, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`;

    return db.query(query, options).then(results => {
        return results.rows[0];
    });
};

exports.addComment = function(image_id, username, comment) {
    const options = [image_id, username, comment];
    const query = `INSERT INTO comments (image_id, username, comment)
        VALUES ($1, $2, $3)
        RETURNING *;`;

    return db.query(query, options).then(results => {
        return results.rows[0];
    });
};

// First step: /db get all information from the database
//  use mounted function in
// mounted: function() {
//    var self = This
//
//    axios.get("/get-single-image" + this.id).then(resp => {
//  self.url = resp.data.url
//  self.title = resp.data.title
//  })
//  }

// Step two:
// server: write app.get("/get single-image:id", (req, res))

// Step three:
// all information assoc. with the image goes into the script
