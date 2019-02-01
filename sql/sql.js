
module.exports = {
    queryAll: 'SELECT TOP 1000 [MacroName],[M_Exam_Note],[M_Example],[M_Exam_pic],[M_Exam_Note1] FROM [macro].[dbo].[example$]',
    queryById: 'SELECT * FROM ?? WHERE id=?',
    del: 'DELETE FROM ?? WHERE id=?',
};