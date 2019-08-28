let path = '/api';

module.exports = {
    // list
    list: path + '/get/list',
    getDetail: path + '/get/list/detail',
    getSyntax: path + '/get/list/syntax',
    getParam: path + '/get/list/param',
    getHistory: path + '/get/list/history',
    getHistoryVersionCode: path + '/get/history/detail',
    getSourceCode: path + '/get/sourceCode',
    saveFeedBack: path + '/save/feedback/item',
    feedBackList: path + '/get/feedback/list',
    saveResponse: path + '/save/add/responseItem',
};