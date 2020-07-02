const fetch = require('node-fetch')
import { daysBetweenDates , getdataGeoname ,getdataWeatherbit,randomInteger } from '../client/js/api_handler'

test('counts number of days between start date and end date',  () => {
  expect(daysBetweenDates("July 5, 2020", "July 15, 2020")).toBe(10);
  expect(daysBetweenDates("July 15, 2020", "August 5, 2020")).toBe(21);
  expect(daysBetweenDates("July 15, 2020", "July 10, 2020")).toStrictEqual({error: "start date should be less than or euqal to end date"});
});

test('the lat and longitude of city is acurate ', async () => {
  let data = await getdataGeoname('mumbai');
  expect(data).toStrictEqual({lat: "19.07283", long: "72.88261"});
}); 

test("It should be a function",async()=>{
	expect(typeof getdataWeatherbit).toBe("function");
	expect(typeof randomInteger).toBe("function");

});
