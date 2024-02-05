import {
  GET_MY_SCHOOL_PENDING,
  GET_MY_SCHOOL_SUCCESS,
  GET_MY_SCHOOL_ERROR,
  GET_EVENTS_REPARTITION_PENDING,
  GET_EVENTS_REPARTITION_SUCCESS,
  GET_EVENTS_REPARTITION_ERROR,
} from '../actions';
import {getMySchool, getEventsRepartition} from '../services/school.service';

export const getMySchoolAction = () => (dispatch: any) => {
  dispatch({type: GET_MY_SCHOOL_PENDING});

  getMySchool()
    .then((data: any) => {
      dispatch({type: GET_MY_SCHOOL_SUCCESS, payload: data.school});
    })
    .catch((error: any) => {
      dispatch({type: GET_MY_SCHOOL_ERROR, payload: error});
    });
};

export const getEventsRepartitionAction = () => (dispatch: any) => {
  dispatch({type: GET_EVENTS_REPARTITION_PENDING});

  getEventsRepartition()
    .then((data: any) => {
      dispatch({type: GET_EVENTS_REPARTITION_SUCCESS, payload: data});
    })
    .catch((error: any) => {
      dispatch({type: GET_EVENTS_REPARTITION_ERROR, payload: error});
    });
};
