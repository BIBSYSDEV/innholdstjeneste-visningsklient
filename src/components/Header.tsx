import React, { FC } from 'react';
import styled from 'styled-components';
import UnitLogo from '../resources/logoUnit.png';

const StyledHeader = styled.div`
  height: 5rem;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #c9d2d8;
`;

const StyledHeading = styled.div`
  color: rgb(0, 0, 0);
  font-family: Crimson Text, serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 5rem;
  margin-left: 1rem;
`;

const StyledLogo = styled.img`
  margin-right: 1rem;
  height: auto;
  max-height: 50%;
`;

const Header: FC = () => {
  return (
    <StyledHeader>
      <StyledHeading>Innholdsinformasjon</StyledHeading>
      <StyledLogo src={UnitLogo} alt="Unit logo" />
    </StyledHeader>
  );
};

export default Header;
