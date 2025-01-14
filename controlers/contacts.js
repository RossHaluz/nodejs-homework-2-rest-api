const Contact = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { id: owner } = req.user;
  const result = await Contact.find({ owner });
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { id } = req.user;
  const result = await Contact.findById(contactId);
  const contactOwnerId = result.owner.toString();

  if (!result) {
    throw HttpError(404, "Not found");
  }
  if (id !== contactOwnerId) {
    return res.status(403).json({ message: "Forbidden" });
  }
  res.json(result);
};

const add = async (req, res) => {
  const owner = req.user.id;

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const { id } = req.user;
  const result = await Contact.findByIdAndDelete(contactId);
  const contactOwnerId = result.owner.toString();

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  if (id !== contactOwnerId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json({
    message: "Delete success",
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
