const { createUser, updateUser, deleteUser, getUserById, getUserByList,insertUser,imageUser ,emailUser,updatedelete,getUserByListall} = require('../controller/controller')

const router = require('express').Router()


router.post("/user/create", createUser)

router.post("/user/insert", insertUser)
router.post("/user/image", imageUser)
router.post("/user/email",emailUser)
router.put("/user/update", updateUser)
router.put("/user/delete",updatedelete)
router.delete("/user/delete", deleteUser)
router.get("/user/get", getUserById)
router.get("/user/list", getUserByList)
router.get("/user/listall", getUserByListall)
module.exports = router



