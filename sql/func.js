let mysql = require('mysql');
let db = require('../configs/db');

let pool = mysql.createPool(db);
module.exports = {
    connPool (sql , cb) {
        pool.getConnection((error, conn)=>{
            let q = conn.query(sql, (err, rows) => {

                if (err) {
                    console.log(err);
                }

                console.log(rows);

                cb(err, rows);

                conn.release();
            });
        })
    }
}