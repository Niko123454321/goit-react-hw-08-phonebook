import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './contactForm.module.css';
import Notiflix from 'notiflix';
import { useState } from 'react';
import initialState from './initialState';
import {
  feachAllContacts,
  feachAddContact,
} from 'redux/contacts/contacts-operations';
import { getAllContacts } from 'redux/contacts/contacts-selectors';

const ContactForm = () => {
  const [state, setState] = useState({ ...initialState });
  const dispatch = useDispatch();
  const contacts = useSelector(getAllContacts);

  useEffect(() => {
    dispatch(feachAllContacts());
  }, [dispatch]);

  const isDublicate = searchName => {
    if (
      contacts.find(contact => {
        return contact.name.toLowerCase() === searchName.toLowerCase();
      })
    ) {
      return true;
    }
  };

  const handleAddContact = ({ name, phone }) => {
    if (isDublicate(name)) {
      Notiflix.Notify.failure(`${name} is already in your contacts!`);
      return false;
    }
    dispatch(feachAddContact({ name, phone }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (handleAddContact({ ...state }) === false) {
      return;
    }
    setState({ ...initialState });
    Notiflix.Notify.success('Contact successfully added');
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const newValue = value;
    setState(prevState => {
      return { ...prevState, [name]: newValue };
    });
  };

  const { name, phone } = state;

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formElement}>
        <label>Name</label>
        <input
          onChange={handleChange}
          className={css.input}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={css.formElement}>
        <label>Number</label>
        <input
          onChange={handleChange}
          className={css.input}
          value={phone}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
