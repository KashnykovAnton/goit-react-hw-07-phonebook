import axios from 'axios';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  filterContactRequest,
  filterContactSuccess,
  filterContactError,
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
} from './contacts-actions';

const BASE_URL = 'https://6196d384af46280017e7e2d4.mockapi.io/contacts';

// --- OLD FORMAT ---
// export const fetchContact = () => dispatch => {
//   dispatch(fetchContactRequest());
//   axios
//     .get('https://6196d384af46280017e7e2d4.mockapi.io/contacts')
//     .then(({ data }) => {
//       console.log('data in fetchContact: ', data);
//       dispatch(fetchContactSuccess(data));
//     })
//     .catch(error => dispatch(fetchContactError(error)));
// };

// --- ASYNC-AWAIT FORMAT ---
export const fetchContact = () => async dispatch => {
  dispatch(fetchContactRequest());
  try {
    const { data } = await axios.get(`${BASE_URL}`);
    dispatch(fetchContactSuccess(data));
  } catch (error) {
    dispatch(fetchContactError(error));
  }
};

export const addContact = item => dispatch => {
  dispatch(addContactRequest());
  console.log('item: ', item);
  axios
    .post(`${BASE_URL}`, item)
    .then(({ data }) => {
      console.log('data: ', data);
      dispatch(addContactSuccess(data));
    })
    .catch(error => dispatch(addContactError(error)));
};

export const deleteContact = id => dispatch => {
  dispatch(deleteContactRequest());
  console.log('id: ', id);
  axios
    .delete(`${BASE_URL}/${id}`)
    .then(() => dispatch(deleteContactSuccess(id)))
    .catch(error => dispatch(deleteContactError(error)));
};

export const filterContact = name => dispatch => {
  dispatch(filterContactRequest());
  console.log('name: ', name);
  axios
    .get(`${BASE_URL}`)
    .then(() => dispatch(filterContactSuccess(name)))
    .catch(error => dispatch(filterContactError(error)));
};
