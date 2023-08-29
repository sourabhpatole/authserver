# Whatsapp Cloud API

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This is web application to collect the food responses and counts with collection of responses from whatsapp message

- Dashboard screen for average responses
- Message Center for sending message with menu items
- Displaying responses with respect to Date
- Send Lunch and Dinner message with Dynamic menu item

## Features

- sending message with dynamic menu data
- collect the responses and shows the total count
- sending feedback message to to collect feedback in five different choices

## Tech

This app is working with webhook created with the help of whatsapp api:

- [react-js] - Used for making front end UI
- [node.js] - evented I/O for the backend and api
- [Express] - fast node.js network app framework [@tjholowaychuk]

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd server
npm install
npm run dev
```

for frontend start

```sh
cd automatedmessage
npm install
npm run start
```

## env for server

JWT_TOKEN=sourabhpatole
PORT=8009
APP_ID=1920896208281704
APP_SECRET=<<YOUR-WHATSAPP-BUSINESS-APP_SECRET>>
RECIPIENT_WAID=917517770319
VERSION=v17.0
PHONE_NUMBER_ID=121276014242914
ACCESS_TOKEN=EAAbTC4AlIGgBAPncAqmwJZA8vCZBi7FYqF9eq4KmGDCWkKThlanK1U1h5ZAFWLkzccXP0VKp69KjJOyIlXeyCfQMh431zKf9JQ62snaPQ4qYJKEQpbTvZAOw0trNp6quUTTZADRZAYGZBUwMzS3C99TxiOmbMrkOxy3aymII8gdo1c1vvHFb0EQxt8pxk98HfYABa8KHdCloAZDZD

## for webhook env

PORT=8000
VERIFY_TOKEN=Sourabh
WHATSAPP_TOKEN=Bearer EAAbTC4AlIGgBABDxVZCR0xsedhSah0TRZCvFOQTozW8Dq8jxZBjfH0QdZBqy1i1lTzx46kdm30VdvOAcel6HTTCOVyWu9kRc5Pv3O0fCKhYPO2KnnHXdc85yEJsZCExq8Urj9PugBAeWFpJ5pBigtvNDO2qBZAGafBJ0uCM6o6LLzWXOvez2C5yMET85iEI1eFBG5SQTkipgZDZD

## env for client

not needed

Want to contribute? Great!
