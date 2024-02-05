import {call} from '../../utils/api';
import {IAddEvent, IUpdateEvent} from '../../interfaces/Events';

export const getEvents = () =>
  call('/planning', 'GET')
    .then(({data}: any) => {
      return data;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });

export const addEvent = (event: IAddEvent) =>
  call('/planning', 'POST', event)
    .then(({data}: any) => {
      return data;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });

export const deleteEvent = (id: string) =>
  call(`/planning/${id}`, 'DELETE')
    .then(({data}: any) => {
      return data;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });

export const updateEvent = (id: string, event: IUpdateEvent) =>
  call(`/planning/${id}`, 'PUT', event)
    .then(({data}: any) => {
      return data;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });

export const acceptEvent = (id: string) =>
  call(`/planning/${id}/accept`, 'GET')
    .then(({data}: any) => {
      return data;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });

export const declineEvent = (id: string) =>
  call(`/planning/${id}/decline`, 'GET')
    .then(({data}: any) => {
      return data;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });

export const getPendingEvents = () =>
  call('/planning/pending', 'GET')
    .then(({data}: any) => {
      return data;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });
