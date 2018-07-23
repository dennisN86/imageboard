// const spicedPg = require("spiced-pg");
// let db;
//
// if (process.env.DATABASE_URL) {
//     db = spicedPg(process.env.DATABASE_URL);
// } else {
//     db = spicedPg("postgres:dennis:password@localhost:5432/imageboard");
// }
//
// exports.getImages = function() {
//     const query = `SELECT * FROM images ORDER BY created_at DESC;`;
//
//     return db.query(query).then(results => {
//         return results.rows;
//     });
// };
//
// exports.addImage = function(url, username, title, description) {
//     const options = [url, username, title, description];
//     const query = `INSERT INTO images (url, username, title, description)
//         VALUES ($1, $2, $3, $4)
//         RETURNING *;`;
//
//     return db.query(query, options).then(results => {
//         return results.rows[0];
//     });
// };
//
// exports.addComment = function(image_id, username, comment) {
//     const options = [image_id, username, comment];
//     const query = `INSERT INTO comments (image_id, username, comment)
//         VALUES ($1, $2, $3)
//         RETURNING *;`;
//
//     return db.query(query, options).then(results => {
//         return results.rows[0];
//     });
// };

const spicedPG = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPG(process.env.DATABASE_URL);
} else {
    db = spicedPG("postgres:dennis:password@localhost:5432/imageboard");
}

// *****************************************************************************
// images queries
// *****************************************************************************

// exports.getFirst = function(id) {
//     const options = [id];
//     const query = `
//             SELECT *, (
//                 SELECT id FROM images
//                 ORDER BY id ASC LIMIT 1)
//             as first_id FROM images
//             WHERE id < $1
//             ORDER BY id DESC
//             LIMIT 6;
//             `;
//
//     return db.query(query, options).then(results => {
//         return results.rows;
//     });
// };

exports.getImages = function(id) {
    const options = [id];
    const query = `
            SELECT *
                FROM images
                WHERE id > $1
                ORDER BY id DESC
                LIMIT 12;
            `;

    return db.query(query, options).then(results => {
        return results.rows;
    });
};

exports.getImage = function(id) {
    const options = [id];
    const query = `
            SELECT *
                FROM images
                WHERE id = $1;
            `;

    return db.query(query, options).then(results => {
        return results.rows[0];
    });
};

exports.insertImage = function(url, username, title, description) {
    const options = [url, username, title, description];
    const query = `
            INSERT INTO images (url, username, title, description)
                VALUES ($1, $2, $3, $4)
            RETURNING *;
            `;

    return db.query(query, options).then(results => {
        return results.rows[0];
    });
};

exports.deleteImage = function(id) {
    const options = [id];
    const query = `
            DELETE FROM images
                WHERE id = $1;
            `;
    return db.query(query, options).then(() => {
        return "Image successfully deleted.";
    });
};

exports.insertComment = function(imageId, username, comment) {
    const options = [imageId, username, comment];
    const query = `
            INSERT INTO comments (image_id, username, comment)
                VALUES ($1, $2, $3)
            RETURNING *;
            `;

    return db.query(query, options).then(results => {
        return results.rows[0];
    });
};

exports.getComments = function(imageId) {
    const options = [imageId];
    const query = `
            SELECT *
                FROM comments
                WHERE image_id = $1
                ORDER BY id DESC
                LIMIT 6;
            `;

    return db.query(query, options).then(results => {
        return results.rows;
    });
};

exports.deleteComment = function(id) {
    const options = [id];
    const query = `
            DELETE FROM comments
                WHERE id = $1;
            `;
    return db.query(query, options);
};
