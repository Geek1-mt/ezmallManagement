const express = require("express")
const app = express()
//const cors = require("cors")
const bodyParser = require("body-parser")
const router = require("./router")


//app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use("/api", router)

//const port =3000

app.listen(3000, () => {
    console.log("服务器运行在:http://localhost:" + 3000)
})
