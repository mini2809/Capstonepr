import { daysBetweenDates,randomInteger } from '../client/js/default_functions.js'

test('counts number of days between start date and end date',  async () => {
  expect(await daysBetweenDates("July 5, 2020", "July 15, 2020")).toBe(10);
  expect(await daysBetweenDates("July 15, 2020", "August 5, 2020")).toBe(21);
});

test("It should be a function",async()=>{
	expect(typeof randomInteger).toBe("function");

});
