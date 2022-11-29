const express = require("express")
const router = express.Router()
const sqlClient = require('./config')
const jwt=require("jsonwebtoken")
// const config=require('./config')


/*
*注册接口
*/
router.post("/register", (req, res) => {
    const { username, password } = req.body
    const sql = "insert into user values(null,?,?)"
    const sql2="select * from user where username=?"
    const arr = [username, password]
    const arr2=[username]

    sqlClient(sql2,arr2,result=>{
        if(result.length){
            let token=jwt.sign({
                username,
            },'somekeys')
            res.send({
                status: 401,
                msg:'该用户名已存在，请更换用户名再重新进行注册',
                token,
                username
            })
        }else{
            sqlClient(sql, arr, result => {

                if (result.affectedRows > 0) {
                    res.send({
                        status: 200,
                        msg:"注册成功！"
                    })
                } else {
                    res.send({
                        status: 401,
                        msg: '注册失败'
                    })
                }
            })

        }
    })

    
})

/*
*登录接口
*/
router.post("/login", (req, res) => {
    const { username, password } = req.body
    const sql = "select * from user where username=? and password=?"
    const arr = [username, password]
    sqlClient(sql, arr, result => {
        //返回用户信息
        if (result.length>0) {
            let token=jwt.sign({
                username,
                id:result[0].id
            },'somekeys')
            res.send({
                status: 200,
                token,
                username
            })
            
        } else {
            res.send({
                status: 401,
                msg: '登录失败'
            })

        }
    })

})

module.exports = router