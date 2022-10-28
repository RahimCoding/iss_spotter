const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};


const fetchCoordsByIP = function(body) {
  ip = JSON.parse(body).ip
  return request(`http://ipwho.is/${ip}`)
};

const fetchISSFlyOverTimes = function (body) {
  const {latitude, longitude} = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};


const printPassTimes = function(passTimes) {
  for(const pass of passTimes){
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }

}


module.exports = { nextISSTimesForMyLocation, printPassTimes };

