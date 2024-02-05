import {
  GET_USERS_PENDING,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
} from '../actions';
import {getUsers} from '../services/users.service';

export const getUsersAction = () => (dispatch: any) => {
  dispatch({type: GET_USERS_PENDING});

  getUsers()
    .then((data: any) => {
      dispatch({type: GET_USERS_SUCCESS, payload: data.users});
    })
    .catch((error: any) => {
      dispatch({type: GET_USERS_ERROR, payload: error});
    });
};
