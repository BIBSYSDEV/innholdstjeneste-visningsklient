import React, { FC } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  height: 2rem;
  width: 100%;
  align-items: center;
  color: rgba(150, 150, 150, 1);
  text-align: left;
  font-family: Barlow, sans-serif;
  font-size: 11px;
  font-style: italic;
  padding-left: 1rem;
`;

const Footer: FC = () => {
  return (
    <Bar>
      Det er <strong>IKKE</strong> tillatt å kopiere/laste ned innholdsinformasjon (bilde, beskrivelse,
      innholdsfortegnelse, lydfiler m.m.) og bruke det i andre sammenhenger/tjenester.
    </Bar>
  );
};

export default Footer;
