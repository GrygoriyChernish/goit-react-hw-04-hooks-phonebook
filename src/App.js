import { useState, useEffect } from 'react';
import shortid from 'shortid';
import s from './App.module.css';

import Section from './UI/Section/Section';
import Container from './UI/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import Modal from './UI/Modal/Modal';
import IconButton from './UI/IconButton/IconButton';
import { ReactComponent as AddIcon } from './icons/businessman.svg';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function formSubmitHandler({ name, number }) {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (contacts === null) {
      setContacts([newContact]);
    } else if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`);
    } else if (name.trim() === '' || number.trim() === '') {
      alert("Enter the contact's name and number phone!");
    } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(number)) {
      alert('Enter the correct number phone!');
    } else {
      setContacts([newContact, ...contacts]);
    }
    toggleModal();
  }

  function deleteContact(contactId) {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  }

  function changeFilter(event) {
    setFilter(event.currentTarget.value);
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  function getFilteredContacts() {
    const normalizedFilter = filter.toLowerCase();
    let filteredContacts;
    if (contacts) {
      filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter),
      );
    } else {
      filteredContacts = [];
    }

    return filteredContacts;
  }

  return (
    <Section>
      <Container>
        <h1 className={s.Title}>Phonebook</h1>
        <p className={s.Text}>
          Add Contact:{' '}
          <IconButton onClick={toggleModal} aria-label="Добавить контакт">
            <AddIcon width="30" height="30" />
          </IconButton>
        </p>

        {showModal && (
          <Modal onClose={toggleModal}>
            <ContactForm onSubmit={formSubmitHandler} />
          </Modal>
        )}
        <h2 className={s.Title}>Contacts</h2>
        <Filter filter={filter} onChange={changeFilter} />
        <ContactList
          contacts={getFilteredContacts()}
          onDeleteContact={deleteContact}
        />
      </Container>
    </Section>
  );
}

export default App;
