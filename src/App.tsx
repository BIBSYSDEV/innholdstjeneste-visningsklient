import React, { useEffect, useState } from 'react';
import './App.css';
import { Innholdsformasjon } from './types';
import CollapsedBox from './components/CollapsedBox';
import Header from './components/Header';
import { ErrorTextField, ImageContainer, ISBNLabel, TitleLabel } from './components/CustomElements';
import { getInnholdsinformasjon } from './services/api';

const URL = window.location.href;
const imageUrl = process.env.REACT_APP_INNHOLDSTJENESTE_IMAGES_URL;
const oriaKeyword = 'oria';

function isEmpty(array?: string[]): boolean {
  return !(array && array.length);
}

const App = () => {
  const [innholdsinformasjon, setInnholdsinformasjon] = useState<Innholdsformasjon | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      const searchQuery = new URLSearchParams(window.location.search);
      const isbn = searchQuery.get('isbn');
      if (!isbn) {
        setLoadingError(new Error(`Resource not found. \nParameter specifying isbn was not provided.`));
        return;
      }
      try {
        setIsLoading(true);
        setLoadingError(undefined);
        setInnholdsinformasjon(await getInnholdsinformasjon(isbn));
      } catch (e) {
        setLoadingError(new Error('Failed to retrieve the resource, please try again.'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loadingError) {
    return <ErrorTextField>{loadingError.message}</ErrorTextField>;
  }

  if (!innholdsinformasjon) {
    return !URL.includes(oriaKeyword) ? <Header /> : null;
  }

  function getClassNameBasedOnURL() {
    return URL.includes(oriaKeyword) ? oriaKeyword : '';
  }

  return (
    <>
      {!URL.includes(oriaKeyword) && <Header />}
      {isLoading ? (
        <progress />
      ) : (
        <>
          <TitleLabel className={getClassNameBasedOnURL()}>{innholdsinformasjon.title}</TitleLabel>
          {imageUrl && innholdsinformasjon.image_small && (
            <ImageContainer
              className={getClassNameBasedOnURL()}
              src={imageUrl + innholdsinformasjon.image_small}
              alt="Bilde av boken"
            />
          )}
          <ISBNLabel className={getClassNameBasedOnURL()}>ISBN: {innholdsinformasjon.isbn}</ISBNLabel>
          {!isEmpty(innholdsinformasjon.description_short) && (
            <CollapsedBox
              className={getClassNameBasedOnURL()}
              name="Beskrivelse fra forlaget (kort)"
              contents={innholdsinformasjon.description_short}
              open={true}
            />
          )}
          {!isEmpty(innholdsinformasjon.description_long) && (
            <CollapsedBox
              className={getClassNameBasedOnURL()}
              name="Beskrivelse fra forlaget (lang)"
              contents={innholdsinformasjon.description_long}
              open={!isEmpty(innholdsinformasjon.description_long)}
            />
          )}
          {!isEmpty(innholdsinformasjon.table_of_contents) && (
            <CollapsedBox
              className={getClassNameBasedOnURL()}
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
