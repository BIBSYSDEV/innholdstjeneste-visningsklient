import React, { FC, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import queryString from 'query-string';
import { Innholdsformasjon } from './types';
import CollapsedBox from './components/CollapsedBox';
import Header from './components/Header';
import { AuthorLabel, ErrorTextField, ImageContainer, ISBNLabel, TitleLabel } from './components/CustomElements';

const URL = window.location.href;
const apiUrl = process.env.REACT_APP_INNHOLDSTJENESTE_API_URL;
const imageUrl = process.env.REACT_APP_INNHOLDSTJENESTE_IMAGES_URL;
const queryParams = queryString.parse(window.location.search);

const App: FC = () => {
  const [innholdsinformasjon, setInnholdsinformasjon] = useState<Innholdsformasjon | undefined>();
  const [errorPresent, setErrorPresent] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (queryParams.isbn === '') {
      setErrorPresent(true);
      setErrorMessage(`Resource not found. \nParameter specifying isbn was not provided.`);
      return;
    }
    const url = apiUrl + '?isbn=' + queryParams.isbn;
    axios
      .get(url)
      .then(({ data }) => {
        const innholdsinformasjonObject = JSON.parse(data.body);
        setInnholdsinformasjon(innholdsinformasjonObject);
        setErrorPresent(false);
      })
      .catch(() => {
        setErrorPresent(true);
        setErrorMessage('Failed to retrieve the resource, please try again.');
      });
  }, []);

  if (errorPresent) {
    return <ErrorTextField>{errorMessage}</ErrorTextField>;
  }

  if (!innholdsinformasjon) {
    return !URL.includes('oria') ? <Header /> : null;
  }

  return (
    <>
      {!URL.includes('oria') && <Header />}
      <TitleLabel>{innholdsinformasjon.title}</TitleLabel>
      {imageUrl && innholdsinformasjon.image_small && (
        <ImageContainer src={imageUrl + innholdsinformasjon.image_small} alt="Bilde av boken" />
      )}
      <AuthorLabel>Helge Ingstad</AuthorLabel>
      <ISBNLabel>ISBN: {innholdsinformasjon.isbn}</ISBNLabel>
      {innholdsinformasjon.description_short && (
        <CollapsedBox
          name="Beskrivelse fra forlaget (kort)"
          summary={innholdsinformasjon.description_short}
          open={true}
        />
      )}
      {innholdsinformasjon.description_long && (
        <CollapsedBox
          name="Beskrivelse fra forlaget (lang)"
          summary={innholdsinformasjon.description_long}
          open={!innholdsinformasjon.description_long}
        />
      )}
      {innholdsinformasjon.table_of_contents && (
        <CollapsedBox
          name="Innholdsfortegnelse"
          contents={innholdsinformasjon.table_of_contents}
          open={!innholdsinformasjon.description_short && !innholdsinformasjon.description_long}
        />
      )}
      <br />
    </>
  );
};
export default App;
