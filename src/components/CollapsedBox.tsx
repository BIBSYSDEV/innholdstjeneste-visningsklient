import React, { FC, useState } from "react";
import styled from "styled-components";

interface CollapsedBoxProps {
  name: String;
  summary?: String;
  contents?: String[];
  open: boolean;
}

const CollapseContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  margin-top: 1rem;
  width: 60%;
`;

const CollapseHandle = styled.button`
  && {
    background-color: white;
    color: rgb(40, 75, 99);
    font-family: Barlow, sans-serif;
    font-size: 23px;
    font-weight: Bold;
    text-align: left;
    display: inline-block;
    border-radius: 5px;
    margin-top: 0.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    width: 100%;
    cursor: pointer;
    outline: none;
    &:focus {
      border-color: orange;
    }
  }
`;

const CollapsedSummary = styled.p`
  background-color: white;
  font-family: Barlow, sans-serif;
  font-size: 20px;
  border-radius: 5px;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

const CollapsedContents = styled.ul`
  background-color: white;
  font-family: Barlow, sans-serif;
  font-size: 20px;
  border-radius: 5px;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

const CollapsedBox: FC<CollapsedBoxProps> = ({
  name,
  summary,
  contents,
  open,
}) => {
  const [showKortInfo, setShowKortInfo] = useState(open);

  const handleKortInfoClick = () => {
    setShowKortInfo(!showKortInfo);
  };

  return (
    <CollapseContainer>
      <CollapseHandle onClick={handleKortInfoClick}>
        {showKortInfo ? "▼" : "▶"} {name}
      </CollapseHandle>
      {showKortInfo && summary && (
        <CollapsedSummary>{summary}</CollapsedSummary>
      )}
      {showKortInfo && contents && (
        <CollapsedContents>
          {contents.map((value, index) => {
            return <p key={index}>{value}</p>;
          })}
        </CollapsedContents>
      )}
    </CollapseContainer>
  );
};

export default CollapsedBox;
