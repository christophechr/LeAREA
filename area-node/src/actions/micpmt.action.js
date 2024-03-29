const axios = require("axios");

const base_url = "https://legend.lnbits.com/"

const createWallet = async(user) => {
  if (!user) return;
  if (!user.micropaymentID) {
    user.micropaymentID = Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  const route = 'usermanager/api/v1/wallets'

  const headers = {
    "X-Api-Key": process.env.LNBITS_ADMIN_KEY,
    "Content-type": 'application/json'
  };

  const body = {
    'admin_id': process.env.LNBITS_ADMIN_ID,
    'user_id': process.env.LNBITS_ADMIN_ID,
    'wallet_name': user.micropaymentID,
  };

  try {
    const response = await axios.post(base_url + route, body, { headers });
    console.log("CREATE WALLET:", response.data)
    user.micropaymentKey = response.data.adminkey;
    user.micropaymentInKey = response.data.inkey;
  } catch (error) {
    console.error(error);
    console.log(JSON.stringify(error.response, undefined, 4));
  }
}


const newInvoice = async (user, params) => {
  const { amount, memo } = params
  const route = "api/v1/payments"
  const headers = {
    "X-Api-Key": user.micropaymentKey,
    "Content-type": "application/json"
  }

  let clean_amount = parseFloat(amount.replace(',', '.'))

  const body = {
    "out": false,
    "amount": clean_amount,
    "memo": memo,
    "expiry": 120,
    "unit": "eur",
    "internal": true,
  };

  console.log('url >', base_url + route)
  console.log('headers >', headers)
  console.log('body >', body)

  let invoice

  try {
    const response = await axios.post(base_url + route, body, { headers });
    invoice = response.data;
    console.log("Got:\n", JSON.stringify(response, undefined, 4));
    console.log("Invoice: ", invoice);
  } catch (error) {
    console.error(error);
    console.log(JSON.stringify(error.response, undefined, 4));
  }
  invoices.push(invoice)
  console.log("Invoices[-1]:", invoices[invoices.length - 1].payment_request)
}

const payInvoice = async (user, params) => {
  const { bolt11 } = params

  console.log("Paying invoice: ", bolt11)

  const route = "api/v1/payments";
  const headers = {
    "X-Api-Key": user.micropaymentKey,
    "Content-type": "application/json",
  };

  const body = {
    out: true,
    bolt11: bolt11,
  };

  try {
    const response = await axios.post(base_url + route, body, { headers });
    console.log("Got:\n", JSON.stringify(response, undefined, 4));
    console.log("Invoice: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error paying:", error);
    return "Error paying invoice";
  }
}


// ############# TRIGGERS:
// receive payment (onchain compatible)
// balance equal, less than, greater than, changed (onchain compatible)
//
// ############# ACTIONS:
// create invoice
// pay invoice


module.exports = {
    createWallet,
    newInvoice,
    payInvoice,
};
