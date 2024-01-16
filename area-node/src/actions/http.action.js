const axios = require("axios");

const get = async (user, params) => {
    if (!params || !params.url) return;

    // Setup headers
    const headers = {
        Accept: "application/json",
    };

    // Add headers
    if (params.headers) {
        const headersArray = params.headers.split(",");
        for (const header of headersArray) {
            const [key, value] = header.split(":");
            headers[key.trim()] = value.trim();
        }
    }

    // Setup body
    let body = undefined;

    // Add body
    if (params.body) {
        body = JSON.parse(params.body);
    }

    try {
        const { data } = await axios({
            url: params.url,
            method: "get",
            headers,
            data: body,
        });
    } catch (err) {
        console.log("Cannot perform GET request (", err.message, ")");
    }
}

const post = async (user, params) => {
    if (!params || !params.url) return;

    // Setup headers
    const headers = {
        Accept: "application/json",
    };

    // Add headers
    if (params.headers) {
        const headersArray = params.headers.split(",");
        for (const header of headersArray) {
            const [key, value] = header.split(":");
            headers[key.trim()] = value.trim();
        }
    }

    // Setup body
    let body = undefined;

    // Add body
    if (params.body) {
        body = JSON.parse(params.body);
    }

    try {
        const { data } = await axios({
            url: params.url,
            method: "post",
            headers,
            data: body,
        });
    } catch (err) {
        console.log("Cannot perform POST request");
    }
}

const put = async (user, params) => {
    if (!params || !params.url) return;

    // Setup headers
    const headers = {
        Accept: "application/json",
    };

    // Add headers
    if (params.headers) {
        const headersArray = params.headers.split(",");
        for (const header of headersArray) {
            const [key, value] = header.split(":");
            headers[key.trim()] = value.trim();
        }
    }

    // Setup body
    let body = undefined;

    // Add body
    if (params.body) {
        body = JSON.parse(params.body);
    }

    try {
        const { data } = await axios({
            url: params.url,
            method: "put",
            headers,
            data: body,
        });
    } catch (err) {
        console.log("Cannot perform PUT request");
    }
}

const patch = async (user, params) => {
    if (!params || !params.url) return;

    // Setup headers
    const headers = {
        Accept: "application/json",
    };

    // Add headers
    if (params.headers) {
        const headersArray = params.headers.split(",");
        for (const header of headersArray) {
            const [key, value] = header.split(":");
            headers[key.trim()] = value.trim();
        }
    }

    // Setup body
    let body = undefined;

    // Add body
    if (params.body) {
        body = JSON.parse(params.body);
    }

    try {
        const { data } = await axios({
            url: params.url,
            method: "patch",
            headers,
            data: body,
        });
    } catch (err) {
        console.log("Cannot perform PATCH request");
    }
}

const del = async (user, params) => {
    if (!params || !params.url) return;

    // Setup headers
    const headers = {
        Accept: "application/json",
    };

    // Add headers
    if (params.headers) {
        const headersArray = params.headers.split(",");
        for (const header of headersArray) {
            const [key, value] = header.split(":");
            headers[key.trim()] = value.trim();
        }
    }

    // Setup body
    let body = undefined;

    // Add body
    if (params.body) {
        body = JSON.parse(params.body);
    }

    try {
        const { data } = await axios({
            url: params.url,
            method: "delete",
            headers,
            data: body,
        });
    } catch (err) {
        console.log("Cannot perform DELETE request");
    }
}

module.exports = {
    get,
    post,
    put,
    patch,
    del,
};
