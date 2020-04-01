const bookDAO = require('../../model/BookDAO/bookDAO');
const moment = require('moment');
moment.locale('zh-cn');
module.exports = {
    /**
     *获取所有图书列表
     */
    getAllBookList: async (ctx, next) => {
        ctx.set('content-type', 'application/json');
        try {
            const data = await bookDAO.getBookInfo();
            ctx.body = { code: 200, message: 'ok', data: data };
        } catch (error) {
            console.log(error);
            ctx.body = { code: 500, message: 'ok', data: {} };
        }
    },
    /**
     * 新增图书
     */
    addNewBook: async (ctx, next) => {
        const reqBody = ctx.request.body;
        ctx.set('content-type', 'application/json');
        try {
            await bookDAO.addNewBook(reqBody);
            ctx.body = { code: 200, message: 'ok', data: { state: true } };
        } catch (error) {
            ctx.body = { code: 500, message: '添加操作异常', data: { state: false } };
            console.log(error);
        }
    },
    /**
     * 提交编辑图书
     */
    editBookInfoSubmit: async (ctx, next) => {
        const reqBody = ctx.request.body;
        if (JSON.stringify(reqBody) === '{}') {
            ctx.body = { code: 504, message: '参数异常', data: { state: false } };
            return;
        }
        const flag = Object.keys(reqBody).some(item => {
            return !reqBody[item];
        });
        if (flag) {
            ctx.body = { code: 504, message: '参数异常', data: { state: false } };
            return;
        }
        console.log(reqBody);
        ctx.set('content-type', 'application/json');
        try {
            await bookDAO.editBookInfo(reqBody);
            ctx.body = { code: 200, message: 'ok', data: { state: true } };
        } catch (error) {
            console.log(error);
            ctx.body = { code: 500, message: '编辑异常', data: { state: false } };
        }
    },
    /**
     * 借出书籍
     * 更新库存,新增借阅记录
     */
    borrowBook: async (ctx, next) => {
        ctx.set('content-type', 'application/json');
        const book_id = ctx.request.book.bookId;
        const borrowPersonName = ctx.request.book.borrowPersonName;
        const department = ctx.request.book.department;
        const borrowTime = moment.moment().format('YYYY-MM-DD HH:mm:ss');
        try {
            await bookDAO.borrowBook(book_id);
            const bookInfo = await bookDAO.searchBookInfoByBookId(book_id);
            if (bookInfo.remaining) {
                const obj = {
                    borrowPersonName: borrowPersonName,
                    re_book_id: book_id,
                    department: department,
                    borrowTime: borrowTime,
                    givebackTime: null
                };
                await bookDAO.addBorrowRecord(obj);
                ctx.body = { code: 200, message: 'ok', data: { state: true } };
            }
        } catch (error) {
            console.log(error);
            ctx.body = { code: 500, message: '系统异常', data: { state: false } };
        }
    },
    /**
     * 归还书籍
     */
    giveBackBook: async (ctx, next) => {
        ctx.set('content-type', 'application/json');
        const book_id = ctx.request.body.bookId;
        const borrowName = ctx.request.body.borrowName;
        try {
            await bookDAO.giveBackBookAddRemaining(book_id);
            const recordId = await bookDAO.queryRecordIdByBookId(book_id, borrowName);
            const givebacktime = moment.moment().format('YYYY-MM-DD HH:mm:ss');
            if (recordId) {
                await bookDAO.updateGiveBackTime(givebacktime, recordId);
                ctx.body = { code: 200, message: 'ok', data: { state: true } };
            }
        } catch (error) {
            console.log(error);
            ctx.body = { code: 500, message: '系统异常', data: { state: false } };
        }
    },
    /**
     * 根据book_id查询借阅详情
     */
    queryBorrowDetails: async (ctx, next) => {
        const book_id = ctx.request.body.bookId;
        ctx.set('content-type', 'application/json');
        try {
            const res = await bookDAO.searchBorrowInfo(book_id);
            ctx.body = { code: 200, message: 'ok', data: res };
        } catch (error) {
            console.log(error);
            ctx.body = { code: 500, message: '系统异常', data: {} };
        }
    },
    /**
     * 借阅记录列表查询
     */
    searchBorrowList: async (ctx, next) => {
        ctx.set('content-type', 'application/json');
        try {
            const data = await bookDAO.searchBorrowList();
            ctx.body = { code: 200, message: 'ok', data: data };
        } catch (error) {
            console.log(error);
            ctx.body = { code: 500, message: '系统异常', data: {} };
        }
    },
    searchByBookName: async () => {
        ctx.set('content-type', 'application/json');
        try {
            const bookName = ctx.request.body.bookName;
            const data = await bookDAO.searchByBookName(bookName);
            ctx.body = { code: 200, message: 'ok', data: data };
        } catch (error) {
            console.log(error);
            ctx.body = { code: 500, message: '系统异常', data: {} };
        }
    }
};
