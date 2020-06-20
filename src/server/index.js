const express = require('express')
const path = require('path')
const cors =  require('cors')
const app = express();
const port=8080;

app.use(cors())
app.use(express.static('dist'));

app.listen(port,function(){
	console.log("listening at port: " +`${port}`);
	
})

app.get('/',function(req,res){
	res.sendFile('dist/index.html');
})

