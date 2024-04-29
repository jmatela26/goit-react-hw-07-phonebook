import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { deleteContact } from 'reduxPhoneBook/phoneBookSlice';

export const Contact = ({ contact }) => {
  const dispatch = useDispatch()
  return (
    <li className={css.contactItem}>
      <span className={css.contactDetails}>
        {contact.name} <br /> {contact.number}
      </span>
      <button className={`${css.button} ${css.deleteButton}`} onClick={() => dispatch(deleteContact(contact.id))}>
        Delete
      </button>
    </li>
  );
};