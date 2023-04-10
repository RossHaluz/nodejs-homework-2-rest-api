const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const currentPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(currentPath, "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findContact = await contacts.find(
    (contact) => contact.id === contactId
  );
  return findContact || null;
};


const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contatcIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if(contatcIndex === -1){ 
    return null;
  }
 const [result] =  contacts.splice(contatcIndex, 1);
 await fs.writeFile(currentPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
const contacts = await listContacts();
const newContact = {
  id: nanoid(),
  ...body
}
contacts.push(newContact);
await fs.writeFile(currentPath, JSON.stringify(contacts, null, 2))
return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId)
  contacts[index] = {id: contactId, ...body}
 await fs.writeFile(currentPath, JSON.stringify(contacts, null, 2))
 return contacts[index]
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
