import React, { useEffect, useState } from 'react';
import './App.css';
import { Innholdsformasjon } from './types';
import CollapsedBox from './components/CollapsedBox';
import Header from './components/Header';
import { ErrorTextField, ImageContainer, ISBNLabel, TitleLabel } from './components/CustomElements';
import { getInnholdsinformasjon } from './services/api';

const URL = window.location.href;
const imageUrl = process.env.REACT_APP_INNHOLDSTJENESTE_IMAGES_URL;

function isEmpty(array?: string[]): boolean {
  return array === undefined || array.length < 1;
}

const App = () => {
  const [innholdsinformasjon, setInnholdsinformasjon] = useState<Innholdsformasjon | undefined>();
  const [errorPresent, setErrorPresent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const searchQuery = new URLSearchParams(window.location.search);
      const isbn = searchQuery.get('isbn');
      if (!isbn) {
        setErrorPresent(true);
        setErrorMessage(`Resource not found. \nParameter specifying isbn was not provided.`);
        return;
      }
      try {
        setIsloading(true);
        setInnholdsinformasjon(await getInnholdsinformasjon(isbn));
        setErrorPresent(false);
      } catch (e) {
        setErrorPresent(true);
        setErrorMessage('Failed to retrieve the resource, please try again.');
      } finally {
        setIsloading(false);
      }
    };
    fetchData();
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
      {isLoading ? (
        <progress />
      ) : (
        <>
          <TitleLabel>{innholdsinformasjon.title}</TitleLabel>
          {imageUrl && innholdsinformasjon.image_small && (
            <ImageContainer src={imageUrl + innholdsinformasjon.image_small} alt="Bilde av boken" />
          )}
          <ISBNLabel>ISBN: {innholdsinformasjon.isbn}</ISBNLabel>
          {!isEmpty(innholdsinformasjon.description_short) && (
            <CollapsedBox
              name="Beskrivelse fra forlaget (kort)"
              contents={innholdsinformasjon.description_short}
              open={true}
            />
          )}
          {!isEmpty(innholdsinformasjon.description_long) && (
            <CollapsedBox
              name="Beskrivelse fra forlaget (lang)"
              contents={innholdsinformasjon.description_long}
              open={!isEmpty(innholdsinformasjon.description_long)}
            />
          )}
          {!isEmpty(innholdsinformasjon.table_of_contents) && (
            <CollapsedBox
              name="Innholdsfortegnelse"
              contents={innholdsinformasjon.table_of_contents}
              open={isEmpty(innholdsinformasjon.description_short) && isEmpty(innholdsinformasjon.description_long)}
            />
          )}
        </>
      )}
      <br />
    </>
  );
};

export default App;
