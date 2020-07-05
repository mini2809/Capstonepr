const fetch = require('node-fetch')
import {  getdataGeoname ,getdataWeatherbit } from '../client/js/api_handler'



test('the lat and longitude of city is acurate ', async () => {
  let data = await getdataGeoname('mumbai');
  expect(data).toStrictEqual({lat: "19.07283", long: "72.88261"});
}); 

test("It should be a function",async()=>{
	expect(typeof getdataWeatherbit).toBe("function");
});
