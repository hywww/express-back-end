let sql = require('../sql/sql');
let func = require('../sql/func');

module.exports = {
    fetchAll(req,res){
        func.connPool(sql.queryList, (result) =>{
            const { recordset, root } = result;
            const _newArr = [];
            recordset && recordset.forEach((item, index) => {
                let _exist = false;
                if (_newArr.length) {
                    _newArr.forEach((list) => {
                        if (list.label === item.Macro_Cat) {
                            _exist = true;
                            list.children.push({
                                id: list.id+'_'+item.MacroName,
                                label: item.MacroName
                            })
                        }
                    })
                }
                if (!_newArr.length || !_exist) {
                    let _child = [{
                        id: index+'_'+item.MacroName,
                        label: item.MacroName
                    }]
                    _newArr.push({
                        id: index,
                        label: item.Macro_Cat,
                        children: _child,
                    })
                }
                
            })
            res.json({code: 200, root, result: _newArr})
        })
    },
    fetchDetail(req,res){
        const params = req.query.name;
        func.connPool(`${sql.queryNameDetail}'${params}'`, (result) =>{
            const { recordset, root } = result;
            res.json({code: 200, root, result: recordset[0]})
        })
    },
    fetchSyntax(req,res){
        const params = req.query.name;
        func.connPool(`${sql.querySyntax}'${params}'`, (result) =>{
            const { recordset, root } = result;
            res.json({code: 200, root, result: recordset[0]})
        })
    },
    fetchHistory(req,res){
        const params = req.query.name;
        func.connPool(`${sql.history}'${params}'`, (result) =>{
            const { recordset, root } = result;
            res.json({code: 200, root, result: recordset})
        })
    },
    fetchParam(req,res){
        const params = req.query.name;
        func.connPool(`${sql.queryParam}'${params}'`, (result) =>{
            const { recordset, root } = result;
            res.json({code: 200, root, result: recordset})
        })
    }
}