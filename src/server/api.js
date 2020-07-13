const fetch = require('node-fetch');
async function getDataPixa(obj)
{
	//console.log("api called"+ JSON.stringify(obj))
	const KEY ='17133670-e311021e9001e30177a4e56b4'
	let Data = await fetch('https://pixabay.com/api/?key='+KEY+'&q='+obj.city+' tourism'+'&image_type=photo')
	let Data1 = await fetch('https://pixabay.com/api/?key='+KEY+'&q='+obj.coun+' tourism'+'&image_type=photo')

	let data = await Data.json()
	let data1 = await Data1.json()

	
	if(data.hits.length == 0){
		//console.log(data1)
		return data1
	}
	else
	{
		//console.log(data)
		return data
	}
	
}
module.exports = getDataPixa
