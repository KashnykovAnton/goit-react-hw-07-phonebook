import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contacts/contacts-operations';

export default function ContactList({ id, name, number }) {
  const dispatch = useDispatch();

  const onDelete = id => dispatch(deleteContact(id));

  return (
    <li>
      <span>{name}:</span>
      <span>{number}</span>
      <button
        type="button"
        id={id}
        onClick={() => {
          onDelete(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}
