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
import { getInnholdsinformasjon, oriaKeyword, SearchParameters } from './services/api';

const filesUrl = process.env.REACT_APP_INNHOLDSTJENESTE_FILES_URL;

function isEmpty(array?: string[]): boolean {
  return !(array && array.length);
}


const App = () => {
  const [innholdsinformasjon, setInnholdsinformasjon] = useState<Innholdsformasjon>();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error>();
  const query = new URLSearchParams(window.location.search);
  const oriaParameterIsSet = query.get(SearchParameters.system) === oriaKeyword;

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
    fetchData().then();
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

  return (
    <>
      {isLoading ? (
        <ProgressWrapper>
          <progress />
        </ProgressWrapper>
      ) : loadingError ? (
        <ErrorTextField data-testid="loading-error">{loadingError.message}</ErrorTextField>
      ) : innholdsinformasjon ? (
        <>
          {!oriaParameterIsSet && (
            <>
              <Header />
              <TitleLabel>{innholdsinformasjon.title}</TitleLabel>
              <ISBNLabel>ISBN: {innholdsinformasjon.isbn}</ISBNLabel>
            </>
          )}

          <main>
            <ContentWrapper>
              <BoxesWrapper>
                {!isEmpty(innholdsinformasjon.descriptionShort) && (
                  <CollapsedBox
                    dataTestid="description-short-box"
                    contentId="description-short-box"
                    oriaParameterIsSet={oriaParameterIsSet}
                    name="Beskrivelse fra forlaget (kort)"
                    contents={innholdsinformasjon.descriptionShort}
                    open={!oriaParameterIsSet}
                  />
                )}
                {!isEmpty(innholdsinformasjon.descriptionLong) && (
                  <CollapsedBox
                    dataTestid="description-long-box"
                    contentId="description-long-box"
                    oriaParameterIsSet={oriaParameterIsSet}
                    name="Beskrivelse fra forlaget (lang)"
                    contents={innholdsinformasjon.descriptionLong}
                    open={!oriaParameterIsSet && isEmpty(innholdsinformasjon.descriptionShort)}
                  />
                )}
                {!isEmpty(innholdsinformasjon.tableOfContents) && (
                  <CollapsedBox
                    dataTestid="description-toc-box"
                    contentId="description-toc-box"
                    oriaParameterIsSet={oriaParameterIsSet}
                    name="Innholdsfortegnelse"
                    contents={innholdsinformasjon.tableOfContents}
                    open={
                      !oriaParameterIsSet &&
                      isEmpty(innholdsinformasjon.descriptionShort) &&
                      isEmpty(innholdsinformasjon.descriptionLong)
                    }
                  />
                )}
                {filesUrl && innholdsinformasjon.audioFile && (
                  <CollapsedBox
                    dataTestid="description-audio-file-box"
                    contentId="description-audio-file-box"
                    oriaParameterIsSet={oriaParameterIsSet}
                    name="Lydutdrag"
                    mp3File={filesUrl + innholdsinformasjon.audioFile}
                    open={false}
                  />
                )}
              </BoxesWrapper>
              {filesUrl && !oriaParameterIsSet && innholdsinformasjon.imagePath && (
                <ImageContainer
                  data-testid="cover-image-container"
                  src={filesUrl + innholdsinformasjon.imagePath}
                  alt="Bilde av boken"
                />
              )}
            </ContentWrapper>
          </main>
          <Footer source={innholdsinformasjon.source} />
        </>
      ) : (
        !oriaParameterIsSet && <Header />
      )}
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </>
  );
};

export default App;
