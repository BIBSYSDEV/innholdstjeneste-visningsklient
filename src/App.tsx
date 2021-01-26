import React, { FC } from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import CollapsedBox from "./components/CollapsedBox";

const OuterContainer = styled.div`
  background-color: #fafafa;
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
`;

const App: FC = () => {
  return (
    <OuterContainer>
      <Header></Header>
      <h1>Innholdstjeneste</h1>
      <CollapsedBox
        name="Beskrivelse fra forlaget (kort)"
        content="That sweet sweet content sdhasjkdhasjkldhkadshfkah adfjakldfja aldfkjaldfkjdsalkf jdlkfjadfk asdlkfjadlkfjadfk ajdflkahjdf kajdfl kahjdf ljk"
        open={true}
      ></CollapsedBox>
      <br></br>
      <CollapsedBox
        name="Beskrivelse fra forlaget (Lang)"
        content="That sweet sweet content sdhasjkdhasjkldhkadshfkah adfjakldfja aldfkjaldfkjdsalkf jdlkfjadfk asdlkfjadlkfjadfk ajdflkahjdf kajdfl kahjdf ljk"
        open={false}
      ></CollapsedBox>
    </OuterContainer>
  );
};

export default App;
