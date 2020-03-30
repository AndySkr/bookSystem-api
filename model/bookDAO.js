const DAO = require('./DAO');

class Book {
    /**
     * 获取所有的图书信息列表
     */
    getBookInfo() {
        return DAO('select * from bookinfo');
    }
    // sendMessage(share){ //用户发帖 将内容(图片路径,文字,时间)存入数据库表中
    //     return DAO('call sendMessage(?,?,?,?)',
    //         [share.txt,share.n_time,share.user_id,share.user_images]);
    // };
}
module.exports = new Book();
