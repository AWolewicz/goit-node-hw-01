const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');


const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        console.log(error.message);
    }
};

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contact = contacts.find(c => c.id === contactId);
        return contact || null;
    } catch (error) {
        console.log(error.message);
    }
};

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const updatedContacts = contacts.filter(c => c.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    } catch (error) {
        console.log(error.message);
    }
};

const addContact = async (name, email, phone) => {
try {
    const contacts = await listContacts();
    const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
