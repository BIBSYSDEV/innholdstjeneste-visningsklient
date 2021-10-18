import { ContentsResponse, Innholdsformasjon } from '../types';
import axios from 'axios';
import Axios from 'axios';
import { API_URL } from '../constants';

export enum SearchParameters {
  isbn = 'isbn',
  system = 'system',
}

export const oriaKeyword = 'oria';

Axios.defaults.baseURL = API_URL;
Axios.defaults.headers.common = {
  Accept: 'application/json',
};

export const getInnholdsinformasjon = async (isbn: string): Promise<Innholdsformasjon> => {
  const url = `?${SearchParameters.isbn}=${isbn}`;
  const innholdResponse = (await axios.get<ContentsResponse>(url)).data;

  const innholdsinformasjon: Innholdsformasjon = { isbn: isbn };
  if (!innholdResponse) {
    return innholdsinformasjon;
  }
  innholdsinformasjon.title = innholdResponse.title;
  innholdsinformasjon.imagePath = getImagePath(
    innholdResponse.imageSmall,
    innholdResponse.imageOriginal,
    innholdResponse.imageLarge
  );
  innholdsinformasjon.descriptionShort = splitOnSomeTags(innholdResponse.descriptionShort).map(removeAllTags);
  innholdsinformasjon.descriptionLong = splitOnSomeTags(innholdResponse.descriptionLong).map(removeAllTags);
  innholdsinformasjon.tableOfContents = splitOnSomeTags(innholdResponse.tableOfContents).map(removeAllTags);

  innholdsinformasjon.audioFile = innholdResponse.audioFile ?? null;

  innholdsinformasjon.source = innholdResponse.source;

  return innholdsinformasjon;
};

const getImagePath = (small: string, original: string, large: string) => {
  if (large) {
    return large;
  } else {
    return original ? original : small;
  }
};

const removeAllTags = (value: string) => {
  return value.replace(/(<([^>]+)>)/gi, '');
};

const splitOnSomeTags = (field: string) => {
  if (field) {
    const replacedSomeTagsWithNewLine = field
      .replaceAll('\\n', '')
      .replaceAll('<br>', '\\n')
      .replaceAll('<br />', '\\n')
      .replaceAll('<p>', '\\n\\n')
      .replaceAll('<li>', '\\n')
      .replaceAll('<br>', '\\n');

    return replacedSomeTagsWithNewLine.split('\\n');
  }
  return [];
};
