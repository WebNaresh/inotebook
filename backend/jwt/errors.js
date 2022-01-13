const { body, validationResult } = require('express-validator');
const express = require('express');
const router =express.Router;



ErrorsHandle=(req,res)=>{const errors = validationResult(req);
if (!errors.isEmpty()) {
    // Route 1 express validator error detection we not used that 
    return res.status(400).json({ errors: errors.array() });
}}
module.exports= ErrorsHandle;