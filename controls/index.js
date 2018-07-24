const fs = require('fs')
module.exports = {
    async getSourceCode(req,res){
        try {
            fs.readFile('public/data/code/aelcr.sas', 'utf8', (err, data)=>{
                if(err) throw err;
                res.json({status: 200, msg: 'ok', result: data})
            });
            
        } catch (err) {
            res.json({status: 501, msg: '读取数据错误', err: err})
        }
        
    }
}