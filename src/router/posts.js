const express = require("express");
const routerPost =  express.Router();
const verify = require("./verifyToken");

routerPost.get('/', verify, (req, res) =>{
    res.json({
        posts : {
            title :" My First Post",
            description : 'Random data you should not access.'
        }
    });
})

module.exports = routerPost;