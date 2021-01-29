import React, { FC } from 'react';
import './App.css';
import Header from './components/Header';
import CollapsedBox from './components/CollapsedBox';
import { TitleLabel, AuthorLabel, ISBNLabel, ImageContainer } from './components/CutsomElements';
import pelsjegere from './resources/pelsjegere.jpg';

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
