import React, { FC, useState } from 'react';
import styled from 'styled-components';

interface CollapsedBoxProps {
  name: string;
  summary?: string;
  contents?: string[];
  open: boolean;
}

const CollapseContainer = styled.div`
  background-color: white;
  width: 60%;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 5px;
  border: solid rgb(40, 75, 99);
`;

const CollapseButton = styled.button`
  && {
    width: 100%;
    display: inline-block;
    background-color: white;
    color: rgb(40, 75, 99);
    text-align: left;
    font-family: Barlow, sans-serif;
    font-size: 23px;
    font-weight: Bold;
    margin-top: 0.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    outline: none;
    border-radius: 5px;
    border-width: 0.25rem;
    border-color: rgb(40, 75, 99);
    cursor: pointer;
    &:focus {
      border-color: orange;
    }
  }
`;

const CollapsedSummary = styled.p`
  background-color: white;
  font-family: Barlow, sans-serif;
  font-size: 20px;
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding: 1rem;
  border-radius: 5px;
`;

const CollapsedContents = styled.ul`
  background-color: white;
  font-family: Barlow, sans-serif;
  font-size: 20px;
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding: 1rem;
  border-radius: 5px;
`;

const CollapsedBox: FC<CollapsedBoxProps> = ({ name, summary, contents, open }) => {
  const [collapsed, setcollapsed] = useState(!open);

  const handleButtonClick = () => {
    setcollapsed(!collapsed);
  };

  return (
    <CollapseContainer>
      <CollapseButton aria-expanded={!collapsed} role="knapp" onClick={handleButtonClick}>
        {!collapsed ? '▼' : '▶'} {name}
      </CollapseButton>
      {!collapsed && summary && <CollapsedSummary aria-relevant="text">{summary}</CollapsedSummary>}
      {!collapsed && contents && (
        <CollapsedContents aria-relevant="text">
          {contents.map((value, index) => {
            return <p key={index}>{value}</p>;
          })}
        </CollapsedContents>
      )}
    </CollapseContainer>
  );
};

export default CollapsedBox;
