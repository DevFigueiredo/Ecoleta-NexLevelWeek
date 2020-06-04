const express = require('express');


const routes = express.Router();



routes.get('/users', (req, res)=>{
 return response.json({message: 'Hello World'})
});



module.exports = routes;