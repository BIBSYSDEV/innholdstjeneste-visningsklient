import styled from 'styled-components';

export const TitleLabel = styled.h1`
  font-family: Barlow, sans-serif;
  font-size: 30px;
  font-weight: Bold;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 2rem;
  &.oria {
  }
`;

export const ISBNLabel = styled.h2`
  font-family: Barlow, sans-serif;
  font-size: 20px;
  font-weight: 200;
  margin-left: 1rem;
  margin-top: 0;
  margin-bottom: 2rem;
  &.oria {
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const BoxesWrapper = styled.div`
  width: 75rem;
  max-width: 95%;
`;

export const ImageContainer = styled.img`
  margin-right: 1rem;
  margin-left: 1rem;
  height: 100%;
  width: fit-content;
  max-width: 100%;
  @media (min-width: 960px) {
    max-width: 50%;
  }
`;

export const ErrorTextField = styled.div`
  white-space: pre-line;
  font-weight: Bold;
  width: 100%;
  text-align: center;
  margin-top: 2rem;
`;

export const ProgressWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 2rem;
`;
