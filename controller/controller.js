const multer = require('multer')
const database = require('../database/database')
var nodemailer = require('nodemailer')



const createUser = async (req, res) => {

    database.query('create table student (Name varchar(50) not null,age int not null,mobileNumber int(10) not null,EmailId varchar(255) unique not null ,ID int primary key )', (error, result) => {
        if (error) console.log("wefwef", error)
        else {
            console.log("posted")
        }
    })
    res.send('created')
}
const insertUser = async (req, res) => {

    let { Name, age, mobileNumber, EmailId } = req.body

    let i = 0;

    let emptyValue = [];

    let value = ["Name", "age", "mobileNumber", "EmailId"];

    for (let i = 0; i < value.length; i++) {
        if (!req.body[value[i]]) {
            emptyValue.push(value[i]);
        }
    }

    if (emptyValue.length > 0) {
        return res.send(`${emptyValue.join(',')} is required`)
    }



    database.query(`select * from student where EmailId ='${EmailId}'`, (error, data) => {
        if (error) {

            console.log(error)
        }
        if (!data.length > 0) {
            database.query(`insert into student (Name,age,mobileNumber,EmailId)values(?,?,?,?)`, [Name, age, mobileNumber, EmailId], (error, data) => {
                if (error) {
                    res.send(error.message)
                }
                else {

                    const email = req.body.EmailId
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'shabnambegum1511@gmail.com',
                            pass: 'dkyd wboi mldn ilho'
                        }
                    })
                    var mailoptions = {
                        from: 'shabnambegum1511@gmail.com',
                        to: email,
                        subject: 'user register successfully',
                        text: 'Thanks for applying,we will let you know \n management \n shabnam'
                    }

                    transporter.sendMail(mailoptions, (error, info) => {
                        if (error) console.log(error)
                        else {
                            console.log('EMAIL SENT SUCESSFULLY', info.response)
                        }
                        res.status(200).json({
                            message: 'sended'

                        })
                    })
                }

            })
        }
        else {
            res.json({
                message: 'already exist',
                data: data
            })
        }
    })
}


const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {


}

const getUserById = async (req, res) => {
    const ID = req.body.ID
    database.query(`select * from student where ID =${ID}`, (error, data) => {
        if (error) {
            console.log(error)
            if (!ID) {
                res.send('ID is required')
            }
        }
        else {

            if (data.length > 0) {
                res.send(data)
            }

            else {
                res.send('data not found')
            }
        }





    })
}


const getUserByListall = async (req, res) => {
    let limit = req?.query?.limit
    let page = req?.query?.page

    if(req.body){

        database.query(`select * from student limit  ${limit}  offset ${page}; `, (error, data) => {
            if (error) console.log(error)
            else {
                res.send(data)
            }
        })
    }
   else{
    database.query(`select * from student  `, (error, data) => {
        if (error) console.log(error)
        else {
            res.send(data)
        }
    })
   }


}




const imageUser = ((req, res) => {
    const imagedata = req.file.image
    console.log("wefwef", imagedata)
    const sql = 'insert into student (image)values(?)';
    database.query(sql, [imagedata], (error, results) => {
        if (error) {
            console.log(error)
        }
        res.status(200).send('successfull')
    })
})

const emailUser = async (req, res) => {

}

const updatedelete = async (req, res) => {
    const ID = req.body.ID
    database.query(`update student set is_deleted = TRUE where ID = ?;`, [ID], (error, data) => {
        if (error) console.log(error)
        else {
            res.status(200).json({
                message: 'updated',

            })
        }
    })
}

const getUserByList = async (req, res) => {
    database.query(`SELECT * FROM student where is_deleted = FALSE`, (error, data) => {
        if (error) console.log(error)
        else {
            res.status(200).json({
                message: 'sended',
                data: data
            })
        }
    })


}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUserByList,
    insertUser,
    imageUser,
    emailUser,
    updatedelete,
    getUserByListall
}