import express from 'express';


const app = express();
app.get('/users', (req, res)=>{
 res.json({
     "Danie": "daniell",
     "Pedro": "sss"
 })
})

app.listen(3333);