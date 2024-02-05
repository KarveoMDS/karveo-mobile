import {call} from '../../utils/api';

export const getUsers = () =>
  call('/users', 'GET')
    .then(({data}: any) => {
      return data;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });
