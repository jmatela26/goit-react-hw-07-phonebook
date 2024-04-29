import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { useState } from 'react';
import { addContact } from 'reduxPhoneBook/phoneBookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'reduxPhoneBook/selectors';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const handleChangeName = event => {
    setName(event.target.value);
  };

  const handleChangeNumber = value => {
    setNumber(value);
  };
  const checkContactExist = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleAddContact = event => {
    event.preventDefault();

    if (!name.trim() || !number.trim()) {
      alert('Please enter both name and phone number.');
      return;
    }

    if (name.trim() === '') {
      alert('Please enter a name.');
      return;
    }

    if (checkContactExist(name)) {
      alert(
        'Contact with this name already exists. Please enter a different name.'
      );
      return;
    }

    dispatch(addContact({ id: nanoid(), name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form className={css.contactForm} onSubmit={handleAddContact}>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Please enter a valid name"
        required
        value={name}
        onChange={handleChangeName}
        placeholder="Enter name"
        className={css.input}
      />

      <PhoneInput
        placeholder="Enter phone number"
        value={number}
        onChange={handleChangeNumber}
        defaultCountry="PH"
        className={css.customPhoneInput}
        limitMaxLength
        name="number"
      />

      <button className={css.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};