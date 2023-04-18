const { Schema, model, default: mongoose } = require("mongoose")
const handleMongooseError = require("../helpers/handleMongooseError")

const contactSchema = new Schema({
     name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
}, { versionKey: false, timestamps: true })

mongoose.put("save", handleMongooseError)

const Contact = model("contact", contactSchema);

module.exports = Contact;