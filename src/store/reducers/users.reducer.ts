import {useAppSelector} from '../../hooks/store';
import type {IUser} from '../../interfaces/User';
import {
  GET_USERS_ERROR,
  GET_USERS_PENDING,
  GET_USERS_SUCCESS,
} from '../actions';

const initialState = {
  students: [],
  instructors: [],
  usersError: null,
  usersLoading: false,
};

export default (state = initialState, action: {type: any; payload: any}) => {
  const {type} = action;

  switch (type) {
    case GET_USERS_PENDING:
      return {
        ...state,
        usersLoading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        students: action.payload.filter((user: any) => user.role === 'student'),
        instructors: action.payload.filter(
          (user: any) => user.role === 'instructor',
        ),
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        usersError: action.payload,
      };

    default:
      return state;
  }
};

export const useCurrentUser = (id: string | undefined): IUser | undefined => {
  const {students, instructors} = useAppSelector(state => state.users);

  return (
    students.find((student: IUser) => student._id === id) ||
    instructors.find((instructor: IUser) => instructor._id === id)
  );
};
