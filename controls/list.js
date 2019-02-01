let sql = require('../sql/sql');
let func = require('../sql/func');

module.exports = {
    fetchAll(req,res){
        func.connPool(sql.queryAll, (result) =>{
            console.log(result)
            res.json({code: 200, msg: 'ok', list: result})
        })
    }
}