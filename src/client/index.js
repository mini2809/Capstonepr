import 'babel-polyfill'
import { getdataGeoname } from '../client/js/api_handler.js'
import { getdataWeatherbit} from '../client/js/api_handler.js'

name='rajnandgaon';
getdataGeoname(name)
.then(res=> {console.log(res)
		return res;
})
.then(resp => getdataWeatherbit(resp))
