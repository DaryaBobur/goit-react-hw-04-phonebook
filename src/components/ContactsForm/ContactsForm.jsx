import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './ContactsFormStyled';
import PropTypes from 'prop-types';

const ContactForm = ({ onSubmit }) =>  {
  
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const userInputId = nanoid();

  const handleChange = evt => {
    const { name, value } = evt.target;

      switch(name) {
        case 'name':
        setName(value);
        break;

        case 'number':
        setNumber(value);
        break;

        default:
        return;
        }
    };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ name, number });
    resetForm();
  };

  const resetForm = () => {
    setName('')
    setNumber('')
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor='htmlFor={userInputId}'>Name
        <input 
            type="text"
            name="name"
            id={userInputId}
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
        /> 
      </label>

      <label htmlFor="{userInputId}">Number
        <input
            type="tel"
            name="number"
            id={userInputId}
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
        />
      </label>

      <button type="submit">Add contact</button>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default ContactForm;