import {useSelector} from 'react-redux';
import {formatDate} from '../../utils/dateUtils';
import {useAppSelector} from '../../hooks/store';
import type {IEvent} from '../../interfaces/Events';
import {
  GET_EVENTS_SUCCESS,
  GET_PENDING_EVENTS_SUCCESS,
  ADD_EVENT_MODAL,
  ADD_EVENT_CLOSE,
  ADD_EVENT_PENDING,
  ADD_EVENT_ERROR,
  ADD_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  ACCEPT_DECLINE_EVENT_SUCCESS,
  SELECT_EVENT,
} from '../actions';

interface IEventsState {
  events: {
    [key: string]: IEvent[];
  };
  pendingEvents: IEvent[];
  addEvent: boolean;
  isAddingEvent: boolean;
  addingEventError: any;
  selectedEvent?: IEvent;
}

const initialState: IEventsState = {
  events: {},
  addEvent: false,
  isAddingEvent: false,
  pendingEvents: [],
  addingEventError: null,
  selectedEvent: undefined,
};

export default (state = initialState, action: {type: any; payload: any}) => {
  const {type} = action;

  switch (type) {
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
      };
    case GET_PENDING_EVENTS_SUCCESS:
      return {
        ...state,
        pendingEvents: action.payload,
      };
    case ADD_EVENT_MODAL:
      return {
        ...state,
        addEvent: true,
      };
    case ADD_EVENT_CLOSE:
      return {
        ...state,
        addEvent: false,
      };
    case ADD_EVENT_PENDING:
      return {
        ...state,
        isAddingEvent: true,
      };
    case ADD_EVENT_ERROR:
      return {
        ...state,
        isAddingEvent: false,
        addingEventError: action.payload,
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        isAddingEvent: false,
        addingEventError: null,
        addEvent: false,
        events: {
          ...state.events,
          [formatDate(action.payload.start)]: [
            ...(state.events[formatDate(action.payload.start)] || []),
            action.payload,
          ],
        },
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: {
          ...state.events,
          [formatDate(action.payload.start)]: [
            ...state.events[formatDate(action.payload.start)].filter(
              (event: IEvent) => event._id !== action.payload._id,
            ),
          ],
        },
      };

    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        events: {
          ...state.events,
          [formatDate(action.payload.previousEvent.start)]: [
            ...state.events[
              formatDate(action.payload.previousEvent.start)
            ].filter(
              (event: IEvent) => event._id !== action.payload.previousEvent._id,
            ),
          ],
          [formatDate(action.payload.newEvent.start)]: [
            ...(state.events[formatDate(action.payload.newEvent.start)] || []),
            {
              ...action.payload.previousEvent,
              ...action.payload.newEvent,
            },
          ],
        },
        selectedEvent: null,
      };
    case ACCEPT_DECLINE_EVENT_SUCCESS:
      return {
        ...state,
        pendingEvents: state.pendingEvents.filter(
          (event: IEvent) => event._id !== action.payload._id,
        ),
        events: {
          ...state.events,
          [formatDate(action.payload.start)]: [
            ...state.events[formatDate(action.payload.start)].filter(
              (event: IEvent) => event._id !== action.payload._id,
            ),
            action.payload,
          ],
        },
        selectedEvent: null,
      };

    case SELECT_EVENT:
      return {
        ...state,
        selectedEvent: action.payload,
      };

    default:
      return state;
  }
};

export const useDayEvents = (day: Date): IEvent[] => {
  const eventsByDay = useSelector((state: any) => state.events.events);
  return eventsByDay[formatDate(day)];
};

export const useCurrentEvent = (id: string | undefined): IEvent | undefined => {
  const eventsByDay = useSelector((state: any) => state.events.events);
  const events = Object.values(eventsByDay).flat();
  return events.find((event: any) => event._id === id) as IEvent | undefined;
};

export const useCurrentUserEvents = (id: string): IEvent[] => {
  const eventsByDay = useAppSelector((state: any) => state.events.events);
  const events: IEvent[] = Object.values(eventsByDay).flat() as IEvent[];
  return events.filter(
    (event: IEvent) =>
      event.student?._id === id || event.instructor?._id === id,
  );
};
