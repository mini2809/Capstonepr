import { postData, apiPixacall } from '../client/js/apiPixa'

test("It should be a function",async()=>{
	expect(typeof postData).toBe("function");
	expect(typeof apiPixacall).toBe("function");

});