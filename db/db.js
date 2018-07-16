const spicedPg = require("spiced-pg");
let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:dennis:password@localhost:5432/imageboard");
}

exports.getImages = function() {
    const query = `SELECT * FROM images`;

    return db.query(query).then(results => {
        return results.rows;
    });
};
