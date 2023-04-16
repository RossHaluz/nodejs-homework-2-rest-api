const {
    listContacts,
    getContactById,
    removeContact,
    addContact, 
    updateContact
  } = require("../models/contacts");
  const { HttpError, ctrlWrapper } = require("../helpers");

  const getAll = async (req, res) => {
      const result = await listContacts();
      res.json(result);
    } 

  const getById = async (req, res) => {
      const { contactId } = req.params;
      const result = await getContactById(contactId);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    } 

  const add = async (req, res) => {
      const result = await addContact(req.body)
      res.status(201).json(result)
    }

  const removeById = async (req, res) => {
      const { contactId } = req.params;
      const result = await removeContact(contactId);
  
      if (!result) {
        throw HttpError(404, "Not Found");
      }
  
      res.json({
        message: "Delete success",
      });
    }

  const updateById = async (req, res) => {
      const {contactId} = req.params;
      if(Object.keys(req.body).length === 0){
        return res.status(400).json({message: "missing fields"})
      }

      const result = await updateContact(contactId, req.body)
      if(!result){
      throw HttpError(404, "Not found")
      }
      res.json(result)
    }

  module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    removeById: ctrlWrapper(removeById),
    updateById: ctrlWrapper(updateById)
  }