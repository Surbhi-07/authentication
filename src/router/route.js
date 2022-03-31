const express = require('express');
const Empdetail = require('../models/employee')
const bcrypt = require('bcrypt')
const registerVal = require('../validation')
const loginVal = require('../validation')
const jwt = require('jsonwebtoken')
const router = new express.Router();


router.post('/register', async (req, res) => {
    const {error} = registerVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //check email
    const email = await Empdetail.findOne({email: req.body.email})
    if(email) return res.status(400).send("email already exist!!!")

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const employee = new Empdetail({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const insertEmployee = await employee.save();
        res.status(200).send(insertEmployee)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    const {error} = loginVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //emaiil
    let employees = await Empdetail.findOne({email: req.body.email})
    if(!employees) return res.status(400).send("email not found");

    //password

    const password = await bcrypt.compare(req.body.password, employees.password)
    if(!password) return res.status(400).send("invalid password!!");

    // token
    const token = jwt.sign({_id: employees._id.toString() }, "private_token")
    res.header('auth-token',token).send(token);

})
module.exports = router;