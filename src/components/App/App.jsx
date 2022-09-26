import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactsForm/ContactsForm';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import { ContainerApp, Title, Subtitle } from './AppStyled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? savedContacts : []});
  const [filter, setFilter] = useState('');

// componentDidMount() {

//   const contacts = localStorage.getItem('contacts');
//   const parsedContactsList = JSON.parse(contacts);

//   if(parsedContactsList) {
//     this.setState({ contacts: parsedContactsList });
//   }
// }


// componentDidUpdate(_, prevState) {
//   const nextContacts = this.state.contacts;
//   const prevContacts = prevState.contacts;

//   if(nextContacts !== prevContacts) {
//     localStorage.setItem('contacts', JSON.stringify(nextContacts))
//   }
// }

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
  }

  const removeContact = (id) => {
    setContacts(prevState => prevState.filter((contact) => contact.id !== id));
  }

  const filterNamesContacts = e => {
     setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
 
    if(!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();

    const filteredContacts = contacts.filter(({name}) => {
      const normalizedName = name.toLocaleLowerCase();
      return normalizedName.includes(normalizedFilter);
    })

    return filteredContacts;
    
  };

  const duplicateName = ({name}) => {
    return contacts.find((contact) => contact.name === name);
  }


  return (
    <ContainerApp>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact}/>

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