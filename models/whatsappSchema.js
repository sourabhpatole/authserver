const mongoose = require("mongoose");
const whatsappSchema = new mongoose.Schema({});
const whatsappdb = new mongoose.model("whatsapp", whatsappSchema);
module.exports = whatsappdb;
