import { AddForm } from './AddForm/AddForm';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { ContactsTitle, Layout, Title } from './Layout';
import { useState, useEffect } from 'react';

const getInitialContacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  }

  return [
    { id: 'id-1', name: 'Rosie Simpson', number: '+380-32-459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '+980-32-443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '180-32-645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '380-32-227-91-26' },
  ];
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const hasName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (hasName) return window.alert(`${name} is allready in contacts`);

    setContacts(prevState => [...prevState, contact]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const filterByName = filtredName => {
    setFilter(filtredName);
  };

  const visibleItems = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Layout>
      <Title>Phonebook</Title>
      <AddForm onAdd={addContact} />
      {contacts.length !== 0 && (
        <>
          <ContactsTitle>Contacts</ContactsTitle>
          <Filter value={filter} onChangeName={filterByName} />
          <ContactsList contacts={visibleItems} onDelete={deleteContact} />
        </>
      )}
      <GlobalStyle />
    </Layout>
  );
};
