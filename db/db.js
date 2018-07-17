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
