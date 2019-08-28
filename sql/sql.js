
module.exports = {
    queryList: 'SELECT * FROM [macro].[dbo].[toc$]',
    queryNameDetail: "SELECT * FROM [macro].[dbo].[toc$] where MacroName = ",
    querySyntax: "SELECT * FROM [macro].[dbo].[toc$] where MacroName = ",
    queryParam: "SELECT * FROM [macro].[dbo].[param$] where MacroName = ",
    history:"SELECT * FROM [macro].[dbo].[history_$] where MacroName = ",
    del: 'DELETE FROM ?? WHERE id=?',
};