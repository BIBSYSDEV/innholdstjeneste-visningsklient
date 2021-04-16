import { Innholdsformasjon } from '../types';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_INNHOLDSTJENESTE_API_URL;

export const getInnholdsinformasjon = async (isbn: string): Promise<Innholdsformasjon> => {
  const url = apiUrl + '?isbn=' + isbn;
  const apiResponse = await axios.get(url);
  const innholdResponse = JSON.parse(apiResponse.data.body);
  const innholdsinformasjon: Innholdsformasjon = { isbn: isbn };
  if (!innholdResponse) {
    return innholdsinformasjon;
  }
  innholdsinformasjon.title = innholdResponse.title;
  innholdsinformasjon.image_small = innholdResponse.image_small;
  innholdsinformasjon.description_short = splitOnTags(innholdResponse.description_short).map(removeAllTags);
  innholdsinformasjon.description_long = splitOnTags(innholdResponse.description_long).map(removeAllTags);
  innholdsinformasjon.table_of_contents = splitOnTags(innholdResponse.table_of_contents).map(removeAllTags);

  return innholdsinformasjon;
};

function removeAllTags(value: string) {
  return value.replace(/(<([^>]+)>)/gi, '');
}

function splitOnTags(field: string) {
  if (field) {
    return field.split('<br>').join('###').split('<p>').join('###').split('<li>').join('###').split('###');
  }
  return [];
}
