const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.log(data.toString()))
    .catch((err) => console.log(err.message));
}

async function getContactById(id) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const contact = contacts.find((contact) => contact.id === id);

    if (contact) {
      console.log(JSON.stringify(contact, null, 2));
    } else {
      console.log("Contact not found.");
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(id) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const updatedContacts = contacts.filter((contact) => contact.id !== id);

    if (updatedContacts.length < contacts.length) {
      await fs.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, null, 2)
      );
      console.log(`Contact with ID ${id} has been removed.`);
    } else {
      console.log(`Contact with ID ${id} not found.`);
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const newContact = {
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.log("Contact has been added.");
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
