import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getContacts,
  getFilter,
  getLoader,
} from '../redux/contacts/contacts-selectors';
import { fetchContact } from '../redux/contacts/contacts-operations';
import ContactListItem from './ContactListItem';

export default function ContactList() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const loader = useSelector(getLoader);
  const dispatch = useDispatch();

  useEffect(() => {
    return dispatch(fetchContact());
  }, [dispatch]);

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  }, [filter, contacts]);

  return (
    <>
      {loader && <h1>Loading...</h1>}
      <ul>
        {!loader &&
          filteredContacts.map(({ id, name, number }) => (
            <ContactListItem key={id} id={id} name={name} number={number} />
          ))}
      </ul>
    </>
  );
}
