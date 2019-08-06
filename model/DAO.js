//通用数据操作对象
const mysql =require('mysql');
const config = require('../model/dbconfig');

//创建数据库连接池
const pool= mysql.createPool(config);

function query(sql,values) {
    return new Promise((resolve,reject)=>{
        pool.getConnection(function (err,connection) {
            if (err){
                reject(err);
            }else {
                console.log("数据库连接成功");
                connection.query(sql,values,(err,rows)=>{
                    if (err){
                        reject(err);
                        console.log("查询失败")
                    }
                    else{
                        resolve(rows);
                        console.log("操作成功")
                    }
                    //释放连接池
                    connection.release();
                })
            }
        })
    })

}
module.exports = query;