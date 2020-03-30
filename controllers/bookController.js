const bookDAO = require('../model/bookDAO');
module.exports = {
    /**
     *获取所有图书列表
     */
    getAllBookList: async (ctx, next) => {
        let data = await bookDAO.getBookInfo();
        ctx.set('content-type', 'application/json');
        ctx.body = { code: 200, message: 'ok', data: data };
    }
};
