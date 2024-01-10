import axios from "axios";

const base_url = "https://legend.lnbits.com/"

let invoices = [];
let paymentHashes = [];

export async function createWallet(user) {
  if (!user) return;
  const route = 'usermanager/api/v1/wallets'

  const headers = {
    "X-Api-Key": process.env.LNBITS_ADMIN_KEY,
    "Content-type": 'application/json'
  };

  const body = {
    'admin_id': process.env.LNBITS_ADMIN_ID,
    'user_id': user.micropaymentID,
    'wallet_name': user.micropaymentID,
  };

  try {
    const response = await axios.post(base_url + route, body, { headers });
    console.log("Got:\n", JSON.stringify(response, undefined, 4));
  } catch (error) {
    console.error(error);
    console.log(JSON.stringify(error.response, undefined, 4));
  }
}


export async function newInvoice(amount, memo) {

  const route = "api/v1/payments"
  const headers = {
    "X-Api-Key": process.env.LNBITS_ADMIN_KEY,
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

export function PrintQrCode() {
  console.log("Should print QR CODE")
  if (invoices[0])
    return <SvgQRCode value={invoices[invoices.length - 1].payment_request} size={100} />

}

export async function payInvoice(bolt11 = invoices[invoices.length - 1]) {
  const route = "api/v1/payments";
  const headers = {
    "X-Api-Key": process.env.LNBITS_ADMIN_KEY,
    "Content-type": "application/json",
  };

  const body = {
    out: true,
    bolt11: bolt11,
  };

  console.log('url >', base_url + route);
  console.log('headers >', headers);
  console.log('body >', body);

  try {
    const response = await axios.post(base_url + route, body, { headers });
    console.log("Got:\n", JSON.stringify(response, undefined, 4));
    console.log("Invoice: ", response.data);
    return response.data;
  } catch (error) {
    return "verifier que vous avez le montant necesaire";
  }
}



export async function decodeInvoice(bolt11)   {
    const route = "api/v1/payments/decode"
  const headers = {
    "X-Api-Key": process.env.LNBITS_ADMIN_KEY,
    "Content-type": "application/json"
  }

  const body = {
    "data": bolt11,
  };

  console.log('url >', base_url + route)
  console.log('headers >', headers)
  console.log('body >', body)

  let hash

  try {
    const response = await axios.post(base_url + route, body, { headers });
    hash = response.data;
    console.log("Got:\n", JSON.stringify(response, undefined, 4));
    console.log("Invoice: ", hash);
  } catch (error) {
    console.error(error);
    console.log(JSON.stringify(error.response, undefined, 4));
  }
  paymentHashes[Date.now()] = hash
}

export async function getWallets() {
  const route = 'usermanager/api/v1/wallets'

  const headers = {
    "X-Api-Key": process.env.LNBITS_ADMIN_KEY,
    "Content-type": "application/json"
  }

  console.log('url >', base_url + route)
  console.log('headers >', headers)

  try {
    const response = await axios.get(base_url + route, { headers });
    console.log("Got:\n", JSON.stringify(response.data, undefined, 4));
  } catch (error) {
    console.error(error);
    console.log(JSON.stringify(error.response, undefined, 4));
  }
}

// ############# TRIGGERS:
// receive payment (onchain compatible)
// send payment (onchain compatible)
// balance equal, less than, greater than, changed (onchain compatible)
//
// ############# ACTIONS:
// create invoice
// pay invoice
// create wallet
// delete wallet
// get wallet balance
// get wallet invoices
// get wallet history


module.exports = {
    newInvoice,
    payInvoice,
};
