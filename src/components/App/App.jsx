import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactsForm/ContactsForm';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import { ContainerApp, Title, Subtitle } from './AppStyled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const addContact = (data) => {
    if(duplicateName(data)) {
      return toast.error(`${data.name} is already in contacts!`)
    }

    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    }
   
    setContacts(prevState => [contact, ...prevState]);
  };

  const removeContact = (id) => {
    setContacts(prevState => prevState.filter((contact) => contact.id !== id));
  };

  const filterNamesContacts = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
 
    if(!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();

    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      return normalizedName.includes(normalizedFilter);
    })

    return filteredContacts;
    
  };

  const duplicateName = ({ name }) => {
    return contacts.find((contact) => contact.name === name);
  };

  return (
    <ContainerApp>
      <Title>Phonebook</Title>
      <ContactForm 
        onSubmit={addContact}
      />

      <Subtitle>Contacts</Subtitle>

      <Filter 
        value={filter} 
        onChange={filterNamesContacts}
      />

      <ContactsList 
        contacts={getFilteredContacts()} 
        removeContact={removeContact}
      />

      <ToastContainer 
        autoClose={3000} 
        theme={'colored'}
      />

    </ContainerApp>
  )
};

export default App;