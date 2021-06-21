import React, { FC } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  height: 2rem;
  width: 95%;
  align-items: center;
  color: rgba(80, 80, 80, 1);
  text-align: left;
  font-family: Barlow, sans-serif;
  font-size: 11px;
  font-style: italic;
  padding-left: 1rem;
`;

const Source = styled.p`
  height: 2rem;
  width: 95%;
  align-items: center;
  color: rgba(0, 0, 0, 1);
  text-align: left;
  font-family: Barlow, sans-serif;
  font-style: normal;
  font-size: 15px;
  border-radius: 5px;
`;

interface FooterProps {
  source?: string;
}

const Footer: FC<FooterProps> = ({ source }) => {
  return (
    <Bar>
      <Source>Kilde: {source}</Source>
      Det er <strong>IKKE</strong> tillatt å kopiere/laste ned innholdsinformasjon (bilde, beskrivelse,
      innholdsfortegnelse, lydfiler m.m.) og bruke det i andre sammenhenger/tjenester.
    </Bar>
  );
};

export default Footer;
