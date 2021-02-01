import React, { FC } from 'react';
import './App.css';
import styled from 'styled-components';
import Header from './components/Header';
import CollapsedBox from './components/CollapsedBox';
import pelsjegere from './resources/pelsjegere.jpg';

const TitleLabel = styled.h1`
  font-family: Barlow, sans-serif;
  font-size: 35px;
  font-weight: Bold;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const AuthorLabel = styled.h2`
  display: inline-block;
  font-family: Barlow, sans-serif;
  font-size: 25px;
  font-weight: 200;
  margin-left: 1rem;
  margin-top: 0;
  margin-bottom: 0;
  padding-right: 1rem;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
`;

const ISBNLabel = styled.h2`
  display: inline-block;
  font-family: Barlow, sans-serif;
  font-size: 25px;
  font-weight: 200;
  margin-left: 1rem;
  margin-top: 0;
  margin-bottom: 0;
`;

const ImageContainer = styled.img`
  position: absolute;
  right: 3rem;
  display: block;
  max-height: 40rem;
  max-width: 40rem;
  min-height: 3rem;
  min-width: 3rem;
`;

const App: FC = () => {
  const shortSummary =
    'Etter å ha brutt opp fra sin sakførerpraksis i Norge, reiste Ingstad til arktiske Canada, der han levde i fire år som pelsjeger.';
  const longSummary =
    'Etter å ha brutt opp fra sin sakførerpraksis i Norge, reiste Ingstad til arktiske Canada, der han levde i fire år som pelsjeger. Pelsjegerliv er beretningen om hans opplevelser i denne tiden. Boken ble utgitt i 1931  og er hans første av i alt tolv bøker';
  const tableOfContents = [
    'The opening',
    'Second breakfast',
    "Three's a crowd",
    'May the fourth be with you',
    'Cinco de mayo',
  ];
  return (
    <>
      <Header />
      <TitleLabel>Pelsjegerliv blandt Nord-Canadas indianere</TitleLabel>
      <ImageContainer src={pelsjegere} alt="Bilde av boken"></ImageContainer>
      <AuthorLabel>Helge Ingstad</AuthorLabel>
      <ISBNLabel>ISBN: 9788205377547</ISBNLabel>
      {shortSummary && (
        <CollapsedBox name="Beskrivelse fra forlaget (kort)" summary={shortSummary} open={true}></CollapsedBox>
      )}
      {longSummary && (
        <CollapsedBox name="Beskrivelse fra forlaget (lang)" summary={longSummary} open={!shortSummary}></CollapsedBox>
      )}
      {tableOfContents && (
        <CollapsedBox
          name="Innholdsfortegnelse"
          contents={tableOfContents}
          open={!shortSummary && !longSummary}></CollapsedBox>
      )}
      <br></br>
    </>
  );
};

export default App;
