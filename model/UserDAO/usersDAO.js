//关于用户对象的相关数据操作
const DAO = require('../DAO');

class User {
    /**
     * 添加用户
     */
    addUser(user) {
        return DAO('insert into myInfo(mLogin,mPassword) values(?,?)', [...user]);
    }
    /**
     * 查找用户
     * @param {*} user
     */
    findUser(user) {
        return DAO('select mLogin from myInfo where mLogin = ?', [user.userAccount]);
    }
}
module.exports = new User();
