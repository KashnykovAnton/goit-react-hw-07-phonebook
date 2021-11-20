import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from '../redux/contacts/contacts-selectors';
import { filterContact } from '../redux/contacts/contacts-operations';

export default function Component() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const changeFilter = useCallback(
    e => {
      dispatch(filterContact(e.target.value));
    },
    [dispatch],
  );

  return (
    <div>
      <label htmlFor={uuidv4()}>Find contacts by name</label>
      <input type="text" value={filter} id={uuidv4()} onChange={changeFilter} />
    </div>
  );
}
