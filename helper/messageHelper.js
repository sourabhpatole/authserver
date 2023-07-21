/* Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var axios = require("axios");
function sendLunchMessage(sourabh) {
  var config = {
    method: "post",
    url: `https://graph.facebook.com/v16.0/121276014242914/messages`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: `91${sourabh}`,
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: `Please select the type of dish would you like to add to your menu for tomorrow's _*lunch*_? 
          If you would like to cancel, please **Ignore** the message`,
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: "000",
                title: "Lunch-Veg",
              },
            },
            {
              type: "reply",
              reply: {
                id: "001",
                title: "Lunch-Non-veg",
              },
            },
          ],
        },
      },
    }),
  };
  return axios(config);
}
function sendDinnerMessage(sourabh) {
  var config = {
    method: "post",
    url: `https://graph.facebook.com/v16.0/121276014242914/messages`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: `91${sourabh}`,
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: `Please select the type of dish would you like to add to your menu for today's _*dinner*_? 
          If you would like to cancel, please **Ignore** the message`,
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: "002",
                title: "Dinner-Veg",
              },
            },
            {
              type: "reply",
              reply: {
                id: "003",
                title: "Dinner-Non-veg",
              },
            },
          ],
        },
      },
    }),
  };
  return axios(config);
}

module.exports = {
  sendLunchMessage: sendLunchMessage,
  sendDinnerMessage: sendDinnerMessage,
};
