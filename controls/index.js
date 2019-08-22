const fs = require('fs')
const path = require('path')
const extraFs = require('fs-extra')
module.exports = {
    getSourceCode(req,res){
        try {
            let name = req.query.name.toLowerCase();
            const type = req.query.type;
            let version = (req.query.version).toLowerCase();
            if (name[0] === '%') {
                name = name.substring(1);
            }
            name = name.replace(/_/g, '-'); // 替换下划线
            name = name.replace(/ /g, ''); // 替换空格
            version = version.replace(/\./g, '-'); // 替换.为-

            fs.readFile(path.join(__dirname, `../../../production/${type}/${name}-${version}.sas`), 'utf8', (err, data)=>{
                if(err) throw err;
                res.json({status: 200, msg: 'ok', result: data})
            });
        } catch (err) {
            res.json({status: 501, msg: '读取数据错误', err: err})
        }
    },
    getSyntax(req,res){
        try {
            let name = req.query.name.toLowerCase();
            const type = req.query.type;
            if (name[0] === '%') {
                name = name.substring(1);
            }
            name = name.replace(/-/g, '_'); // 替换横杠
            name = name.replace(/ /g, ''); // 替换空格
            fs.readFile(path.join(__dirname, `../../../production-text/${name}.txt`), 'utf8', (err, data)=>{
                if(err) throw err;
                res.json({status: 200, msg: 'ok', result: data})
            });
        } catch (err) {
            res.json({status: 501, msg: '读取数据错误', err: err})
        }
    },
    getExample(req,res){
        try {
            let name = req.query.name.toLowerCase();
            const type = req.query.type;
            if (name[0] === '%') {
                name = name.substring(1);
            }
            name = name.replace(/-/g, '_'); // 替换横杠
            name = name.replace(/ /g, ''); // 替换空格
            fs.readFile(path.join(__dirname, `../../../production-pdf/${name}.pdf`), 'binary', (err, data)=>{
                if(err) throw err;
                res.json({status: 200, msg: 'ok', result: data})
            });
        } catch (err) {
            res.json({status: 501, msg: '读取数据错误', err: err})
        }
    },
    saveFeedBackItem(req,res){
        extraFs.readJson('public/data/problemList.json')
        .then( data => {
            let dataJson = data;
            if (!dataJson[req.body.id]) {
              dataJson[req.body.id] = [];
            }
            req.body.resId = (new Date()).valueOf();
            req.body.children = [];
            dataJson[req.body.id].push(req.body);
            extraFs.writeJson('public/data/problemList.json',dataJson)
            .then(()=>{
                res.json({status: 200, msg: '保存成功'})
            })
            .catch((err)=>{
                res.json({status: 501, msg: '保存失败', err: err})
            })
        })
        .catch( err => {
            console.log(err)
        })
    },
    saveResponseItem(req,res){
        extraFs.readJson('public/data/problemList.json')
        .then( data => {
            let dataJson = data;
            console.log(dataJson[req.body.id])
            dataJson[req.body.id].forEach((item) => {
                if(item.resId === req.body.resId){
                    item.children.push(req.body)
                }
            })
            extraFs.writeJson('public/data/problemList.json',dataJson)
            .then(()=>{
                res.json({status: 200, msg: '保存成功'})
            })
            .catch((err)=>{
                res.json({status: 501, msg: '保存失败', err: err})
            })
        })
        .catch( err => {
            console.log(err)
        })
    },
    getFeedBackList(req, res) {
        extraFs.readJson('public/data/problemList.json')
        .then((data)=>{
            // const dataJson = JSON.parse(data);
            res.json({status: 200, result: data[req.body.name]} || [])
        })
        .catch((err)=>{
            res.json({status: 502, msg: '读取json失败', err: err})
        })
    }
}
