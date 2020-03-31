let usersDAO = require('../../model/BookDAO/bookDAO');
const crypto = require('crypto');

module.exports = {
    list: async (ctx, next) => {
        let data = {
            list: [
                {
                    name: 'Andy',
                    age: 18
                },
                {
                    name: 'C.John',
                    age: 20
                },
                {
                    name: 'Rose',
                    age: 19
                }
            ]
        };
        ctx.body = { code: '200', message: 'ok', data: data };
    },
    /**
     * 添加用户
     */
    addUser: async (ctx, next) => {
        const hash = crypto.createHash('md5');
        hash.update(ctx.request.body.userPassword);
        const pwd = hash.digest('hex');
        let user = {};
        user.userAccount = ctx.request.body.userAccount;
        user.userPassword = pwd;

        var jsondata = await usersDAO.findUser(user);
        if (jsondata.length != 0) {
            ctx.body = { code: 500, message: 'ok', data: 0 };
        } else {
            try {
                await usersDAO.addUser(user);
                ctx.body = { code: 200, message: 'ok', data: 1 };
            } catch (err) {
                ctx.body = { code: 500, message: err.toString(), data: [] };
            }
        }
    },
    /**
     * 登陆
     */
    login: async (ctx, next) => {
        const hash = crypto.createHash('md5');
        hash.update(ctx.request.body.userPassword);
        var pwd = hash.digest('hex');
        let user = {};
        user.userAccount = ctx.request.body.userAccount;
        user.userPassword = pwd;
        try {
            let jsondata = await usersDAO.login();
            // TODO
            ctx.body = { code: 200, message: 1, data: null };
            ctx.body = { code: 500, message: 0, data: null };
        } catch (err) {
            ctx.body = { code: 500, message: err.toString(), data: [] };
        }
    }
};
