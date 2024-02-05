import {useAppSelector} from '../../hooks/store';
import {
  GET_MY_SCHOOL_SUCCESS,
  GET_EVENTS_REPARTITION_SUCCESS,
} from '../actions';

const initialState = {
  mine: {},
  hours: {},
};

export default (state = initialState, action: {type: any; payload: any}) => {
  const {type} = action;

  switch (type) {
    case GET_MY_SCHOOL_SUCCESS:
      return {
        ...state,
        mine: action.payload,
      };
    case GET_EVENTS_REPARTITION_SUCCESS:
      return {
        ...state,
        hours: action.payload,
      };
    default:
      return state;
  }
};

export const useSchool = () => {
  return useAppSelector(state => state.school).mine;
};

export const useSchoolEventsRepartition = () => {
  return useAppSelector(state => state.school).hours;
};
