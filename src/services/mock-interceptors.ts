import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';
import { SearchParameters } from './api';

export const mockIsbnThatTriggersServerError = '4723947823';

const mockResponse = {
  body: '{"image_small":"files/images/small/4/2/9788202479824.jpg","description_short":"Det er en fin sommerdag. 14 år gamle Arnstein Weide kommer for å treffe kameraten sin, Ã˜rjan. Men utenfor huset er det biler og politifolk. På skolen neste dag går det rykter om at Ã˜rjan har skutt faren sin. Og at han deretter er forsvunnet. Tjue år senere er Arnstein blitt forfatter. Ã˜rjan er fortsatt forsvunnet, drapet like uoppklart. Så dukker en teatergruppe fra Tyskland opp. Og ting begynner å skje.","image_original":"files/images/original/4/2/9788202479824.jpg","created":"2021-05-08T09:53:08.841154Z","isbn":"9788202479824","description_long":"Det er en fin sommerdag. 14 år gamle Arnstein Weide kommer for å treffe kameraten sin, Ørjan. Men utenfor huset er det biler og politifolk. På skolen neste dag går det rykter om at Ørjan har skutt faren sin. Og at han deretter er forsvunnet. Tjue år senere er Arnstein blitt forfatter. Ørjan er fortsatt forsvunnet, drapet like uoppklart. Så dukker en teatergruppe fra Tyskland opp. Og ting begynner å skje.","date_of_publication":"2015","modified":"2021-09-02T01:01:07.113491Z","source":"BOKBASEN","image_large":"files/images/large/4/2/9788202479824.jpg","title":"Tittel ikke tilgjengelig"}',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'OPTIONS,GET',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
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

  // mock.onGet(`\\?${SearchParameters.isbn}=${mockIsbnThatTriggersServerError}`).reply(500, null);
  mock.onGet(new RegExp(`\\?${SearchParameters.isbn}=${mockIsbnThatTriggersServerError}`)).reply(500, mockResponse);
  mock.onGet(new RegExp(`.*`)).reply(200, mockResponse);

  // ALL OTHER
  mock.onAny().reply(function (config) {
    throw new Error('Could not find mock for ' + config.url + ', with method: ' + config.method);
  });
};
