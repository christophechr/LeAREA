// Import axios
const axios = require('axios');

const time = async (user, params) => {
    const { time, operator, timezone } = params;

    if (!time || !operator || !timezone) {
        return false;
    }

    // Call an API http://worldtimeapi.org/api/timezone/Europe/Paris

    const timeApi = await axios.get(`https://worldtimeapi.org/api/timezone/${timezone}`);

    console.log(timeApi);

    const utcTime = timeApi.utc_datetime;

    console.log(utcTime);

    const date = new Date(utcTime);

    console.log(date);

    const userDate = new Date(time);

    switch (operator) {
        case 'greater_than':
            return userDate > date;
        case 'less_than':
            return userDate < date;
        default:
            return false;
    }
}