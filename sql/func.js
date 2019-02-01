let mysql = require('mssql');
// let db = require('../configs/db');

let pool = mysql.connect('mssql://sa:Gcp0123@localhost/macro');
module.exports = {
    connPool (sql , cb) {
        pool.then(()=>{
            new mysql.Request()
                .query(sql).then((rows) => {
                    console.log(rows);
                    cb(rows);
                }).catch((err) => {
                    console.log(err);
                    cb(err);
                })
            // let q = conn.query(sql, (err, rows) => {
            //     if (err) {
            //         console.log(err);
            //     }

            //     console.log(rows);

            //     cb(err, rows);

            //     conn.release();
            // });
        }).catch((err) => {
            console.log(err);
            cb(err);
        })
    }
}