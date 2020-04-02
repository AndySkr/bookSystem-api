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
     * bookId,borrowPersonName,department
     */
    borrowBook: async (ctx, next) => {
        ctx.set('content-type', 'application/json');
        const book_id = ctx.request.body.bookId;
        const borrowPersonName = ctx.request.body.borrowPersonName;
        const department = ctx.request.body.department;
        const borrowTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        try {
            const bookInfo = await bookDAO.searchBookInfoByBookId(book_id);
            console.log(bookInfo);
            if (bookInfo && bookInfo[0].remaining > 0) {
                console.log(bookInfo.remaining);
                const obj = {
                    borrowPersonName: borrowPersonName,
                    re_book_id: book_id,
                    department: department,
                    borrowTime: borrowTime,
                    givebackTime: null
                };
                await bookDAO.borrowBook(book_id);
                await bookDAO.addBorrowRecord(obj);
                ctx.body = { code: 200, message: 'ok', data: { state: true } };
            } else {
                ctx.body = { code: 500, message: '书籍余量不足', data: { state: false } };
            }
        } catch (error) {
            console.log(error);
            ctx.body = { code: 500, message: '系统异常', data: { state: false } };
        }
    },
    /**
     * 归还书籍
     * bookId
     * borrowName 借书人
     */
    giveBackBook: async (ctx, next) => {
        ctx.set('content-type', 'application/json');
        const book_id = ctx.request.body.bookId;
        const borrowName = ctx.request.body.borrowName;
        try {
            const res = await bookDAO.queryRecordIdByBookId(book_id, borrowName);
            const recordInfo = res[0];
            const count = recordInfo.count;
            const remaining = recordInfo.remaining;
            if (remaining === count) {
                ctx.body = { code: 500, message: '归还书籍失败', data: { state: false } };
                return;
            }
            if (recordInfo.recordId) {
                const givebacktime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                try {
                    await Promise.all([
                        bookDAO.giveBackBookAddRemaining(book_id),
                        bookDAO.updateGiveBackTime(givebacktime, recordInfo.recordId)
                    ]);
                    ctx.body = { code: 200, message: '归还书籍成功', data: { state: true } };
                } catch (error) {
                    console.log(error);
                    ctx.body = { code: 500, message: '归还书籍失败', data: { state: false } };
                }

                ctx.body = { code: 200, message: 'ok', data: { state: true } };
            } else {
                ctx.body = { code: 500, message: '查询书籍异常', data: { state: false } };
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
            const data = {
                borrowPersonName: res.borrowPersonName,
                department: res.department,
                borrowTime: moment(res.department).format('YYYY-MM-DD HH:mm:ss')
            };
            ctx.body = { code: 200, message: 'ok', data: data };
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
    searchByBookName: async (ctx, next) => {
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
