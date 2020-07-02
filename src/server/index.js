require('dotenv').config()
const express = require('express')
const path = require('path')
const cors =  require('cors')
const bodyParser = require('body-parser')
const app = express();
const port=8087;
const getDataPixa = require('./api.js')
const fetch = require('node-fetch');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())
app.use(express.static('dist'));

app.listen(port,function(){
	console.log("listening at port: " +`${port}`);

})

app.get('/',function(req,res){
	res.sendFile('dist/index.html');
})

app.post('/test',async function(req,res){
	let obj = req.body
	let data = await getDataPixa(obj)
	res.send(data);
}) 
	




