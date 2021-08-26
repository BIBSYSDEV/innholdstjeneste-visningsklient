import React, { useEffect, useState } from 'react';
import { Innholdsformasjon } from './types';
import CollapsedBox from './components/CollapsedBox';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  BoxesWrapper,
  ContentWrapper,
  ErrorTextField,
  ImageContainer,
  ISBNLabel,
  ProgressWrapper,
  TitleLabel,
} from './components/CustomElements';
import { getInnholdsinformasjon } from './services/api';

const filesUrl = process.env.REACT_APP_INNHOLDSTJENESTE_FILES_URL;
const oriaKeyword = 'oria';

function isEmpty(array?: string[]): boolean {
  return !(array && array.length);
}

const App = () => {
  const [innholdsinformasjon, setInnholdsinformasjon] = useState<Innholdsformasjon | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error>();
  const query = new URLSearchParams(window.location.search);
  const oriaParameterIsSet = query.has(oriaKeyword);

  useEffect(() => {
    const fetchData = async () => {
      const isbn = getIsbnFromQueryOrPath();
      if (!isbn) {
        setLoadingError(new Error(`Resource not found. \nParameter specifying isbn was not provided.`));
        return;
      }
      try {
        setIsLoading(true);
        setLoadingError(undefined);
        setInnholdsinformasjon(await getInnholdsinformasjon(isbn));
      } catch (error) {
        setLoadingError(new Error('Failed to retrieve the resource, please try again.'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIsbnFromQueryOrPath = () => {
    const searchQuery = new URLSearchParams(window.location.search);
    let isbn = searchQuery.get('isbn');
    if (!isbn) {
      let path = window.location.pathname;
      path = path.endsWith('/') ? path.substr(0, path.length - 1) : path;
      isbn = path.substring(path.lastIndexOf('/') + 1);
    }
    return isbn;
  };

  const getClassNameBasedOnURL = () => {
    return oriaParameterIsSet ? oriaKeyword : '';
  };

  return (
    <>
      {isLoading ? (
        <ProgressWrapper>
          <progress />
        </ProgressWrapper>
      ) : loadingError ? (
        <ErrorTextField>{loadingError.message}</ErrorTextField>
      ) : innholdsinformasjon ? (
        <>
          {!oriaParameterIsSet && (
            <>
              <Header />
              <TitleLabel>{innholdsinformasjon.title}</TitleLabel>
              <ISBNLabel>ISBN: {innholdsinformasjon.isbn}</ISBNLabel>
            </>
          )}

          <ContentWrapper>
            <BoxesWrapper>
              {!isEmpty(innholdsinformasjon.description_short) && (
                <CollapsedBox
                  className={getClassNameBasedOnURL()}
                  name="Beskrivelse fra forlaget (kort)"
                  contents={innholdsinformasjon.description_short}
                  open={!oriaParameterIsSet}
                />
              )}
              {!isEmpty(innholdsinformasjon.description_long) && (
                <CollapsedBox
                  className={getClassNameBasedOnURL()}
                  name="Beskrivelse fra forlaget (lang)"
                  contents={innholdsinformasjon.description_long}
                  open={isEmpty(innholdsinformasjon.description_short)}
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
              {filesUrl && innholdsinformasjon.audio_file && (
                <CollapsedBox
                  className={getClassNameBasedOnURL()}
                  name="Lydutdrag"
                  mp3File={filesUrl + innholdsinformasjon.audio_file}
                  open={false}
                />
              )}
            </BoxesWrapper>
            {filesUrl && !oriaParameterIsSet && innholdsinformasjon.image_path && (
              <ImageContainer src={filesUrl + innholdsinformasjon.image_path} alt="Bilde av boken" />
            )}
          </ContentWrapper>
          <Footer source={innholdsinformasjon.source} />
        </>
      ) : (
        !oriaParameterIsSet && <Header />
      )}
    </>
  );
};

export default App;
