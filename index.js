const express = require('express')
let app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const router = require('./router/router')
app.use(router)



let port = 3456
app.listen(port, () => {
    console.log(`server is looking for ${port}`)
})




