import {call} from '@/utils/api';

export const getMySchool = () =>
    call('/schools/mine', 'GET')
        .then(({data}: any) => {
          return data;
        })
        .catch((error: any) => {
          return Promise.reject(error);
        });


export const getEventsRepartition = () =>
    call('/schools/mine/dashboard', 'GET')
        .then(({data}: any) => {
          return data;
        })
        .catch((error: any) => {
          return Promise.reject(error);
        });
