const queryString = require("querystring");

const axios = require("axios");

const User = require("../models/user.model.js");
const crypto = require('crypto');
let verifierGlobal = "";


async function redirectToAuthCodeFlow(request, reply) {
    const verifier = generateCodeVerifier(128);
    verifierGlobal = verifier;
    const challenge = await generateCodeChallenge(verifier);
    let url = "";
    const params = new URLSearchParams();
    params.append("client_id", process.env.SPOTIFY_CLIENT_ID);
    params.append("response_type", "code");
    params.append("redirect_uri", `${process.env.FRONT_URL}/spotify`);
    params.append("scope", "user-read-private user-read-email user-read-currently-playing");

    url = `https://accounts.spotify.com/authorize?${params.toString()}`;
    reply.send({ url: url});
}


function calculateSHA256(data) {
    try {
      const hash = crypto.createHash('sha256');
      hash.update(data);
      return hash.digest('hex');
    } catch (error) {
      console.error('Erreur lors du calcul de la somme de contrôle SHA-256:', error);
      throw error;
    }
  }


async function getAccessToken(code) {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", `${process.env.FRONT_URL}/spotify`);
    console.log((new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')));
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')) },
        body: params
    });
    console.log(code );
    const { access_token } = await result.json();
    return access_token;
}


function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


const registerToken = async (request, reply) => {
    const { code } = request.body;

    if (!code) {
        reply.status(400).send({
            message: "Code not provided",
        });
    }
    try {
        const accessToken = await getAccessToken(code);
        console.log("hey" + accessToken);

        console.log(request.user);
        if (accessToken) {
            request.user.SpotifyToken = accessToken;
            await request.user.save();
            // console.log(user);
            reply.send({
                message: "Spotify token stored",
            });
        } else {
            reply.status(500).send({
                message: "Spotify token not stored",
            });
        }
    } catch (err) {
        console.log(err);
        reply.status(500).send({
            message: err.message,
        });
    }

}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = calculateSHA256(data);
    return digest;
}


module.exports = {
    redirectToAuthCodeFlow,
    registerToken,
};
