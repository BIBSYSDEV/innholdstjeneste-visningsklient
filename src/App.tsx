import React, { FC, useEffect, useState } from 'react';
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

const App: FC = () => {
  const [innholdsinformasjon, setInnholdsinformasjon] = useState<Innholdsformasjon | undefined>();
  const [errorPresent, setErrorPresent] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const searchQuery = new URLSearchParams(window.location.search);
      const isbn = searchQuery.get('isbn');
      if (!isbn || isbn === '') {
        setErrorPresent(true);
        setErrorMessage(`Resource not found. \nParameter specifying isbn was not provided.`);
        return;
      }
      try {
        const innholdsinformasjon = await getInnholdsinformasjon(isbn);
        setInnholdsinformasjon(innholdsinformasjon);
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
      {isLoading && <progress />}
      {!isLoading && <TitleLabel>{innholdsinformasjon.title}</TitleLabel>}
      {!isLoading && imageUrl && innholdsinformasjon.image_small && (
        <ImageContainer src={imageUrl + innholdsinformasjon.image_small} alt="Bilde av boken" />
      )}
      <ISBNLabel>ISBN: {innholdsinformasjon.isbn}</ISBNLabel>
      {!isLoading && !isEmpty(innholdsinformasjon.description_short) && (
        <CollapsedBox
          name="Beskrivelse fra forlaget (kort)"
          contents={innholdsinformasjon.description_short}
          open={true}
        />
      )}
      {!isLoading && !isEmpty(innholdsinformasjon.description_long) && (
        <CollapsedBox
          name="Beskrivelse fra forlaget (lang)"
          contents={innholdsinformasjon.description_long}
          open={!isEmpty(innholdsinformasjon.description_long)}
        />
      )}
      {!isLoading && !isEmpty(innholdsinformasjon.table_of_contents) && (
        <CollapsedBox
          name="Innholdsfortegnelse"
          contents={innholdsinformasjon.table_of_contents}
          open={isEmpty(innholdsinformasjon.description_short) && isEmpty(innholdsinformasjon.description_long)}
        />
      )}
      <br />
    </>
  );
};

export default App;
