const Contact = require('../models/contact')  
const { HttpError, ctrlWrapper } = require("../helpers");

  const getAll = async (req, res) => {
      const result = await Contact.find({name: "Alex"});
      res.json(result);
    } 

  const getById = async (req, res) => {
      const { contactId } = req.params;
      const result = await Contact.findById(contactId);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    } 

  const add = async (req, res) => {
      const result = await Contact.create(req.body)
      res.status(201).json(result)
}

  const removeById = async (req, res) => {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndDelete(contactId);
  
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

      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
      if(!result){
      throw HttpError(404, "Not found")
      }
      res.json(result)
}
    
const updateStatusContact  = async (req, res) => {
      const {contactId} = req.params;
      if(Object.keys(req.body).length === 0){
        return res.status(400).json({message: "missing field favorite"})
      }

      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
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
    updateById: ctrlWrapper(updateById),
    updateStatusContact : ctrlWrapper(updateStatusContact )
  }