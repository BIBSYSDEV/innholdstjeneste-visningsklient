import React, { FC, useState } from "react";
import styled from "styled-components";

interface CollapsedBoxProps {
  name: String;
  content: String;
  open: boolean;
}

const CollapseContainer = styled.div`
  background-color: Grey;
  border-radius: 5px;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  width: 40%;
`;

const CollapseHandle = styled.span`
  background-color: white;
  font: Barlow, sans-serif;
  display: inline-block;
  border-radius: 5px;
  margin-top: 0.5rem;
  width: 100%;
  cursor: pointer;
`;

const CollapsedContent = styled.p`
  background-color: white;
  padding: 1rem;
  pointer-events: none;
`;

const CollapsedBox: FC<CollapsedBoxProps> = ({ name, content, open }) => {
  const [showKortInfo, setShowKortInfo] = useState(open);

  const handleKortInfoClick = () => {
    setShowKortInfo(!showKortInfo);
  };

  return (
    <CollapseContainer>
      <CollapseHandle onClick={handleKortInfoClick}>
        {showKortInfo ? "▼" : "▶"} {name}
      </CollapseHandle>
      {showKortInfo && <CollapsedContent>{content}</CollapsedContent>}
    </CollapseContainer>
  );
};

export default CollapsedBox;
