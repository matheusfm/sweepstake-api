const mysql = require("mysql");

module.exports = function (app) {
    return () => mysql.createConnection({
            "host": process.env.MYSQL_HOST,
            "user": process.env.MYSQL_USER,
            "password": process.env.MYSQL_PASSWORD,
            "database": process.env.MYSQL_DATABASE,
        });
}