const mongoose = require("mongoose");
const WhatsappSchema = new mongoose.Schema({});
const whatsappdb = new mongoose.model("whatsapp", WhatsappSchema);
module.exports = whatsappdb;
