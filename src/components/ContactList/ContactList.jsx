import { useSelector, useDispatch } from 'react-redux';
import { getAllContacts } from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';
import { feachDeleteContsct } from 'redux/contacts/contacts-operations';
import Notiflix from 'notiflix';

import css from './contactList.module.css';

const ContactList = () => {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getAllContacts);
  const dispatch = useDispatch();

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizFilter);
    });
    return result;
  };

  const handleDeliteContact = id => {
    dispatch(feachDeleteContsct(id));
    Notiflix.Notify.success('contact successfully deleted');
  };

  const items = getFilteredContacts();
  const myContacts = items.map(({ id, name, phone }) => (
    <li key={id} className={css.li}>
      {name}: {phone}{' '}
      <button type="button" onClick={() => handleDeliteContact(id)}>
        Delite
      </button>
    </li>
  ));

  return <ul>{myContacts}</ul>;
};

export default ContactList;
