let mysql = require('mssql');
// let db = require('../configs/db');

let pool = mysql.connect('mssql://sa:Gcp0123@47.101.218.100:1433/macro');
module.exports = {
    connPool (sql , cb) {
        pool.then(()=>{
            new mysql.Request()
                .query(sql).then((rows) => {
                    console.log(rows);
                    cb(Object.assign(rows, {root: true}));
                }).catch((err) => {
                    console.log(err);
                    cb(Object.assign(err, {root: false}));
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
            cb(Object.assign(err, {root: false}));
        })
    }
}