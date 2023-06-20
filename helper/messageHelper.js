/* Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var axios = require("axios");
function sendMessage(sourabh) {
  var config = {
    method: "post",
    url: `https://graph.facebook.com/v16.0/121276014242914/messages`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      messaging_product: "whatsapp",
      preview_url: false,
      recipient_type: "individual",
      to: `91${sourabh}`,
      type: "template",
      template: {
        name: "food_dept",
        language: {
          code: "en_US",
        },
        components: [
          {
            type: "header",
            parameters: [
              {
                type: "text",
                text: ",",
              },
            ],
          },
        ],
      },
    }),
  };
  return axios(config);
}

module.exports = {
  sendMessage: sendMessage,
};
