const DAO = require('../DAO');

class Book {
    /**
     * 获取所有的图书信息列表
     */
    getBookInfo() {
        return DAO('select * from bookinfo');
    }
    /**
     * 新增图书
     */
    addNewBook(params) {
        return DAO('INSERT INTO bookinfo (book_name,author,classification,remaining,count)VALUES(?,?,?,?)', [
            params.bookName,
            params.author,
            params.classification,
            params.remaining,
            params.count
        ]);
    }
    /**
     * 编辑书籍信息
     * book_name,author,classification,count,book_id
     */
    editBookInfo(params) {
        return DAO('UPDATE bookinfo SET book_name=?,author=?, classification=?,count=? WHERE book_id=?', [
            params.bookName,
            params.author,
            params.classification,
            params.count,
            params.bookId
        ]);
    }
    /**
     * 借出书籍
     */
    borrowBook(book_id) {
        return DAO('UPDATE bookinfo SET remaining=remaining-1 WHERE book_id=?', [book_id]);
    }
    /**
     * 根据book_id 查询书籍信息
     */
    searchBookInfoByBookId(book_id) {
        return DAO('SELECT * FROM bookinfo WHERE book_id=?', [book_id]);
    }
    /**
     * 添加借阅记录
     */
    addBorrowRecord(params) {
        return DAO(
            'INSERT INTO borrowrecord (borrowPersonName,re_book_id,department,borrowTime,givebackTime) VALUES (?,?,?,?,?)',
            [params.borrowPersonName, params.re_book_id, params.department, params.borrowTime, params.givebackTime]
        );
    }
    /**
     * 归还书籍增加剩余量
     */
    giveBackBookAddRemaining(book_id) {
        return DAO('UPDATE bookinfo SET remaining=remaining+1 WHERE book_id=?', [book_id]);
    }
    /**
     *根据book_id 和借阅人姓名 去record记录里面查询对应的数据,并且此项的givebackTime为空,说明还未归还
     */
    queryRecordIdByBookId(book_id, borrowName) {
        return DAO(
            'SELECT * FROM borrowrecord INNER JOIN bookinfo ON bookinfo.book_id = borrowrecord.re_book_id AND bookinfo.book_id = ? AND borrowrecord.borrowPersonName = ? AND borrowrecord.givebackTime is null',
            [book_id, borrowName]
        );
    }
    /**
     * 更新归还时间
     */
    updateGiveBackTime(givebacktime, recordId) {
        return DAO('UPDATE borrowrecord SET givebackTime=? WHERE recordId =?', [givebacktime, recordId]);
    }
    /**
     * 查询书籍借阅详情
     * (根据book_id 去record记录里面查询对应的项,并且此项的givebackTime为空,说明还未归还)
     */
    searchBorrowInfo(book_id) {
        return DAO(
            ' SELECT * FROM borrowrecord INNER JOIN bookinfo ON bookinfo.book_id = borrowrecord.re_book_id AND bookinfo.book_id = ? AND borrowrecord.givebackTime is null',
            [book_id]
        );
    }
    /**
     * 借阅记录列表查询
     */
    searchBorrowList() {
        return DAO('SELECT *  FROM borrowrecord LEFT JOIN bookinfo ON borrowrecord.re_book_id = bookinfo.book_id');
    }
    /**
     * 根据书名搜索书籍
     */
    searchByBookName(bookName) {
        return DAO('SELECT * FROM bookinfo WHERE book_name LIKE "%"?"%"', [bookName]);
    }
}
module.exports = new Book();
// sendMessage(share){ //用户发帖 将内容(图片路径,文字,时间)存入数据库表中
//     return DAO('call sendMessage(?,?,?,?)',
//         [share.txt,share.n_time,share.user_id,share.user_images]);
// };
