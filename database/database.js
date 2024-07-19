const mysql = require('mysql2')
const createconnection = mysql.createConnection({
    user: 'root',
    password: '1511',
    port: 3306,
    database: 'firstproject',
    host: '127.0.0.1'
})

createconnection.connect((error, data) => {
    if (error) console.log(error)
    else {
        console.log('database is connected')
    }
})

module.exports = createconnection