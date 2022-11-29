// module.exports={
//     jwtSecret:"somesecretkeyforjsonwebtoken"
// }

const mysql = require("mysql")
const client = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "web2022"
})

//query理解为查询，数据库的操作方法
const sqlClient= (sql, arr, callback) =>{
    /**
     * 接受三个参数
     * sql语句
     * sql语句的参数
     * 回调函数返回值
     */
    client.query(sql,arr,(error,result)=>{
        if(error){
            console.log(error)
            return;
        }
        //回调函数
        callback(result)
    })
}

module.exports = sqlClient