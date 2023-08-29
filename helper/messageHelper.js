/* Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var axios = require("axios");
function sendLunchMessage(sourabh, lvegmenu, lnonvegmenu) {
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
          text: `Please Select the type of dish would you like in *Next day* Lunch \n _Veg-Menu_ : *${lvegmenu}* \n _Non-Veg-Menu_ : *${lnonvegmenu}*`,
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
function sendDinnerMessage(sourabh, dvegmenu, dnonvegmenu) {
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
          text: `Please Select the type of dish would you like in Dinner \n _Veg-Menu_ : *${dvegmenu}* \n _Non-Veg-Menu_ : *${dnonvegmenu}*`,
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
function sendFeedbackMessageL(sourabh) {
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
        type: "list",
        header: {
          type: "text",
          text: "Feedback",
        },
        body: {
          text: "*Lunch* feedback",
        },
        footer: {
          text: "@Team-Tekclan",
        },
        action: {
          button: "Click for Feedback",
          sections: [
            {
              title: "Feedback Options",
              rows: [
                {
                  id: "001",
                  title: "lunch-Very-Unsatisfied",
                  description: "😩",
                },
                {
                  id: "002",
                  title: "lunch-Unsatisfied",
                  description: "🙁",
                },
                {
                  id: "003",
                  title: "lunch-Neutral",
                  description: "😐",
                },
                {
                  id: "004",
                  title: "lunch-Satisfied",
                  description: "🙂",
                },
                {
                  id: "005",
                  title: "lunch-Very-Satisfied",
                  description: "😃",
                },
              ],
            },
          ],
        },
      },
    }),
  };
  return axios(config);
}
function sendFeedbackMessageD(sourabh) {
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
        type: "list",
        header: {
          type: "text",
          text: "Feedback",
        },
        body: {
          text: "*Dinner* feedback",
        },
        footer: {
          text: "@Team-Tekclan",
        },
        action: {
          button: "Click for Feedback",
          sections: [
            {
              title: "Feedback Options",
              rows: [
                {
                  id: "001",
                  title: "dinner-Very-Unsatisfied",
                  description: "😩",
                },
                {
                  id: "002",
                  title: "dinner-Unsatisfied",
                  description: "🙁",
                },
                {
                  id: "003",
                  title: "dinner-Neutral",
                  description: "😐",
                },
                {
                  id: "004",
                  title: "dinner-Satisfied",
                  description: "🙂",
                },
                {
                  id: "005",
                  title: "dinner-Very-Satisfied",
                  description: "😃",
                },
              ],
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
  sendFeedbackMessageL: sendFeedbackMessageL,
  sendFeedbackMessageD: sendFeedbackMessageD,
};
