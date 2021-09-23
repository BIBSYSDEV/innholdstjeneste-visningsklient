import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';
import { SearchParameters } from './api';

export const mockIsbnThatTriggersServerError = '4723947823';

const mockResponse = {
  body: '{"image_small":"files/images/small/7/4/9788205377547.jpg","description_short":"Etter å ha brutt opp fra sin sakførerpraksis i Norge, reiste Ingstad til arktiske Canada, der han levde i fire år som pelsjeger.","created":"2021-08-19T11:08:00.208848Z","author":"Helge Ingstad","isbn":"9788205377547","description_long":"Etter å ha brutt opp fra sin sakførerpraksis i Norge, reiste Ingstad til arktiske Canada, der han levde i fire år som pelsjeger. Pelsjegerliv er beretningen om hans opplevelser i denne tiden. Boken ble utgitt i 1931 og er hans første av i alt tolv bøker","date_of_publication":"1931","source":"BOKBASE","title":"Pelsjegerliv blandt Nord-Canadas indianere","table_of_contents":"The openingSecond breakfastCinco de mayo"}',
  headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'OPTIONS,GET',
  },
  statusCode: 200,
};

export const interceptRequestsOnMock = () => {
  const mock = new MockAdapter(Axios);

  // USEFUL FOR DEBUGGING MOCKED_CALLS
  // const mockGetDelayedAndLogged = (pathPattern: string, statusCode: number, mockedResponse: any, delay = 0) => {
  //   mock.onGet(new RegExp(pathPattern)).reply((config) => {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve(loggedReply(config, statusCode, mockedResponse));
  //       }, delay);
  //     });
  //   });
  // };
  //
  // const loggedReply = (config: AxiosRequestConfig, statusCode: number, mockedResult: unknown) => {
  //   /* eslint-disable no-console */
  //   //console.log('MOCKED API-CALL: ', config, statusCode, mockedResult);
  //   console.log('MOCKED API-CALL: ', config.url);
  //   return [statusCode, mockedResult];
  // };

  mock.onGet(new RegExp(`\\?${SearchParameters.isbn}=${mockIsbnThatTriggersServerError}`)).reply(500, mockResponse);
  mock.onGet(new RegExp(`.*`)).reply(200, mockResponse);

  // ALL OTHER
  mock.onAny().reply(function (config) {
    throw new Error('Could not find mock for ' + config.url + ', with method: ' + config.method);
  });
};
