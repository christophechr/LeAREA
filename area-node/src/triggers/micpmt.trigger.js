import axios from "axios";

const incommingPayment = async (user, params) => {
    const { operator, value } = params;

    if (!operator || !value) return false;

    const lastPayment = 1

    switch (operator) {
        case "equal":
            return lastPayment === value;
        case "greater_than":
            return lastPayment > value;
        case "less_than":
            return lastPayment < value;
        case "greater_than_or_equal":
            return lastPayment >= value;
        case "less_than_or_equal":
            return lastPayment <= value;
        default:
            return false;
    }
};

// Each user has:
/*
 A Wallet ID
 A Admin Key (X-Api-Key)
 A Read Key
 */
// The admin has:
/*
A Admin ID
 */

export async function getWalletBalance() {
    const headers = {
        "X-Api-Key": process.env.LNBITS_ADMIN_KEY,
        "Content-type": "application/json"
    }
    const route = "api/v1/wallet"
    var response = null
    try {
        response = await axios.get(base_url + route, { headers });
        console.log("Got:\n", JSON.stringify(response.data, undefined, 4));
    } catch (error) {
        console.error(error);
        console.log(JSON.stringify(error.response, undefined, 4));
    }
    return response.data
}


const balance = async (user, params) => {
    const { location, operator, temperature, unit } = params;

    if (!location || !operator || !temperature || !unit) {
        return false;
    }

    const balance = getWalletBalance()

    const weatherTemperature =
        unit === "celsius"
            ? weather.main.temp - 273.15
            : weather.main.temp * 1.8 - 459.67;

    switch (operator) {
        case "equal":
            return weatherTemperature === temperature;
        case "greater_than":
            return weatherTemperature > temperature;
        case "less_than":
            return weatherTemperature < temperature;
        case "greater_than_or_equal":
            return weatherTemperature >= temperature;
        case "less_than_or_equal":
            return weatherTemperature <= temperature;
        default:
            return false;
    }
};

module.exports = {
    incommingPayment,
    balance,
};
