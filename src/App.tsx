import React, { FC } from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import CollapsedBox from "./components/CollapsedBox";
import pesljegere from "./resources/pelsjegere.jpg";

const OuterContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  min-height: 100vh;
`;

const TitleLabel = styled.div`
  font-family: Barlow, sans-serif;
  font-size: 35px;
  font-weight: Bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const AuthorLabel = styled.span`
  display: inline-block;
  font-family: Barlow, sans-serif;
  font-size: 25px;
  margin-left: 1rem;
  padding-right: 1rem;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
`;

const ISBNLabel = styled.span`
  display: inline-block;
  font-family: Barlow, sans-serif;
  font-size: 25px;
  margin-left: 1rem;
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
  let shortSummary;
  let longSummary;
  let tableOfContents;
  shortSummary = "That sweet sweet content";
  longSummary =
    "This is a long version containing information about that same sweet sweet content. It is however important to difrerentiate the two. ";
  tableOfContents = [
    "The opening",
    "Second breakfast",
    "Three's a party",
    "May the fourth be with you",
    "Cinco de mayo",
  ];
  return (
    <OuterContainer>
      <Header></Header>
      <TitleLabel>The Book of Books</TitleLabel>{" "}
      <ImageContainer src={pesljegere}></ImageContainer>
      <AuthorLabel>Helge Ingstad</AuthorLabel>
      <ISBNLabel>ISBN: 9788205377547</ISBNLabel>
      {shortSummary && (
        <CollapsedBox
          name="Beskrivelse fra forlaget (kort)"
          summary={shortSummary}
          open={true}
        ></CollapsedBox>
      )}
      {longSummary && (
        <CollapsedBox
          name="Beskrivelse fra forlaget (lang)"
          summary={longSummary}
          open={!shortSummary}
        ></CollapsedBox>
      )}
      {tableOfContents && (
        <CollapsedBox
          name="Innholdfortegnelse"
          contents={tableOfContents}
          open={!shortSummary && !longSummary}
        ></CollapsedBox>
      )}
    </OuterContainer>
  );
};

export default App;
