import {AxiosError} from 'axios';
import {
  ACCEPT_DECLINE_EVENT_ERROR,
  ACCEPT_DECLINE_EVENT_PENDING,
  ACCEPT_DECLINE_EVENT_SUCCESS,
  ADD_EVENT_ERROR,
  ADD_EVENT_PENDING,
  ADD_EVENT_SUCCESS,
  DELETE_EVENT_ERROR,
  DELETE_EVENT_PENDING,
  DELETE_EVENT_SUCCESS,
  GET_EVENTS_ERROR,
  GET_EVENTS_PENDING,
  GET_EVENTS_SUCCESS,
  GET_PENDING_EVENTS_ERROR,
  GET_PENDING_EVENTS_PENDING,
  GET_PENDING_EVENTS_SUCCESS,
  UPDATE_EVENT_ERROR,
  UPDATE_EVENT_PENDING,
  UPDATE_EVENT_SUCCESS,
} from '../actions';
import {
  acceptEvent,
  addEvent,
  declineEvent,
  deleteEvent,
  getEvents,
  getPendingEvents,
  updateEvent,
} from '../services/events.service';
import type {IAddEvent, IEvent, IUpdateEvent} from '../../interfaces/Events';

export const getEventsAction = () => (dispatch: any) => {
  dispatch({type: GET_EVENTS_PENDING});

  getEvents()
    .then((data: IEvent[]) => {
      dispatch({type: GET_EVENTS_SUCCESS, payload: data});
    })
    .catch((error: AxiosError) => {
      dispatch({type: GET_EVENTS_ERROR, payload: error.message});
    });
};

export const addEventAction = (newEvent: IAddEvent) => (dispatch: any) => {
  dispatch({type: ADD_EVENT_PENDING});

  addEvent(newEvent)
    .then((data: IEvent) => {
      dispatch({type: ADD_EVENT_SUCCESS, payload: data});
    })
    .catch((error: AxiosError) => {
      dispatch({type: ADD_EVENT_ERROR, payload: error.message});
    });
};

export const updateEventAction =
  (previousEvent: IEvent, event: IUpdateEvent) => async (dispatch: any) => {
    dispatch({type: UPDATE_EVENT_PENDING});

    await updateEvent(previousEvent._id, event)
      .then((data: IEvent) => {
        dispatch({
          type: UPDATE_EVENT_SUCCESS,
          payload: {
            previousEvent,
            newEvent: data,
          },
        });
        return Promise.resolve();
      })
      .catch((error: AxiosError) => {
        dispatch({type: UPDATE_EVENT_ERROR, payload: error.message});
        return Promise.reject(error);
      });
  };

export const deleteEventAction = (event: IEvent) => async (dispatch: any) => {
  dispatch({type: DELETE_EVENT_PENDING});

  await deleteEvent(event._id)
    .then(() => {
      dispatch({type: DELETE_EVENT_SUCCESS, payload: event});
      return Promise.resolve();
    })
    .catch((error: AxiosError) => {
      dispatch({type: DELETE_EVENT_ERROR, payload: error.message});
      return Promise.reject(error);
    });
};

export const acceptEventAction = (event: IEvent) => async (dispatch: any) => {
  dispatch({type: ACCEPT_DECLINE_EVENT_PENDING});

  await acceptEvent(event._id)
    .then((data: any) => {
      dispatch({
        type: ACCEPT_DECLINE_EVENT_SUCCESS,
        payload: data,
      });
      return Promise.resolve();
    })
    .catch((error: AxiosError) => {
      dispatch({type: ACCEPT_DECLINE_EVENT_ERROR, payload: error.message});
      return Promise.reject(error);
    });
};

export const declineEventAction = (event: IEvent) => async (dispatch: any) => {
  dispatch({type: ACCEPT_DECLINE_EVENT_PENDING});

  await declineEvent(event._id)
    .then((data: any) => {
      dispatch({
        type: ACCEPT_DECLINE_EVENT_SUCCESS,
        payload: data,
      });
      return Promise.resolve();
    })
    .catch((error: AxiosError) => {
      dispatch({type: ACCEPT_DECLINE_EVENT_ERROR, payload: error.message});
      return Promise.reject(error);
    });
};

export const getPendingEventAction = () => (dispatch: any) => {
  dispatch({type: GET_PENDING_EVENTS_PENDING});

  getPendingEvents()
    .then((data: IEvent[]) => {
      dispatch({type: GET_PENDING_EVENTS_SUCCESS, payload: data});
    })
    .catch((error: AxiosError) => {
      dispatch({type: GET_PENDING_EVENTS_ERROR, payload: error.message});
    });
};
