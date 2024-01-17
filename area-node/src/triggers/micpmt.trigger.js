const axios = require("axios");

const base_url = "https://legend.lnbits.com/"

// Fake implementation, can be erased.
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
   An Admin ID
*/

const getWalletBalance = async (walletKey) => {
    const headers = {
        "X-Api-Key": walletKey,
        "Content-type": "application/json"
    }
    const route = "api/v1/wallet"
    var response = null
    try {
        response = await axios.get(base_url + route, { headers });
        console.log("Got:\n", JSON.stringify(response.data.balance, undefined, 4));
        return response.data.balance
    } catch (error) {
        console.error(error);
        console.log(JSON.stringify(error.response, undefined, 4));
    }
}


const balance = async (user, params) => {
    const { operator, value } = params;
    console.log("Checking balance for user: ", user.email)

    if (!operator || !value) return false;

    const balance = await getWalletBalance(user.micropaymentKey)

    switch (operator) {
        case "equal":
            return balance === value;
        case "greater_than":
            return balance > value;
        case "less_than":
            console.log(balance, " < ", value);
            return balance < value;
        case "greater_than_or_equal":
            return balance >= value;
        case "less_than_or_equal":
            return balance <= value;
        default:
            return false;
    }
};

module.exports = {
    //incommingPayment, // Not implemented, can be erased
    balance,
};
