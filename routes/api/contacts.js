const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact, 
  updateContact
} = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    console.log(req.params);
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body)
    if(error){
      throw HttpError(400, error.message)
    }
    const result = await addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not Found");
    }

    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const {error} = addSchema.validate(req.body)
    if(error){
      throw HttpError(400, error.message)
    }
    const result = await updateContact(contactId, req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
