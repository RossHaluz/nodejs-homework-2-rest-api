const sgMail = require('@sendgrid/mail');

const {SEND_GRID_APIKEY} = process.env;

sgMail.setApiKey(SEND_GRID_APIKEY);

const sendMail = async (data) => {
    const email = {...data, from: "rossgaluzinskiy@gmail.com"}
    sgMail.send(email);

    return true;
}

module.exports = {sendMail};