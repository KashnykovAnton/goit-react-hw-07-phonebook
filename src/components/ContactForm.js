import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { getContacts } from '../redux/contacts/contacts-selectors';
import {
  fetchContact,
  addContact,
} from '../redux/contacts/contacts-operations';

import { connect } from 'react-redux';

function ContactForm({ fetchContact }) {
  // export default function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    return fetchContact();
  }, [fetchContact]);

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
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
    formSubmitHandler({ name, number });
    setName('');
    setNumber('');
  };

  const formSubmitHandler = item => {
    const normalizedName = item.name.toLowerCase();
    contacts.find(el => {
      return el.name.toLowerCase() === normalizedName;
    })
      ? alert(`${item.name} is already in contacts`)
      : dispatch(addContact(item));
  };

  const nameId = uuidv4();
  const telId = uuidv4();
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={nameId}>Name</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
        value={name}
        id={nameId}
        onChange={handleChange}
      />
      <label htmlFor={telId}>Number</label>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        required
        value={number}
        id={telId}
        onChange={handleChange}
      />
      <button type="submit">Add contact</button>
    </form>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchContact: () => dispatch(fetchContact()),
});

export default connect(null, mapDispatchToProps)(ContactForm);

ContactForm.propTypes = {
  state: PropTypes.objectOf(PropTypes.string),
};
