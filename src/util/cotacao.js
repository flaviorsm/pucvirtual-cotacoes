const request = require('request');

const api_token = 'wYHoXpNQloLba8Hm1obCtCEFCkxopdFG2GyeWVtvNb3eDiY5ITuXNNHlD5eo';

const cotacao = (symbol, callback) => {
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`
    request({ url: url, json: true }, (err, response) => {
        if (err) {
            return callback({
                mensage: `Somenting went wrong: ${err}`,
                code: 500
            }, undefined);
        }

        if (response.body === undefined || response.body.data === undefined) {
           return callback({
                mensage: `No data found`,
                code: 404
            }, undefined);
        }

        const parseJSON = response.body.data[0];
        const { symbol, price, price_open, day_high, day_low } = parseJSON;
        const data = { symbol, price, price_open, day_high, day_low };

        return callback(undefined, data);
    });
}

module.exports = cotacao;

