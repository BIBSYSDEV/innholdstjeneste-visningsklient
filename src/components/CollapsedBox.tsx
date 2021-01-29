import React, { FC, useState } from 'react';
import { CollapseContainer, CollapseButton, CollapsedSummary, CollapsedContents } from './CutsomElements';

interface CollapsedBoxProps {
  name: string;
  summary?: string;
  contents?: string[];
  open: boolean;
}

const CollapsedBox: FC<CollapsedBoxProps> = ({ name, summary, contents, open }) => {
  const [collapsed, setcollapsed] = useState(!open);

  const handleButtonClick = () => {
    setcollapsed(!collapsed);
  };

  return (
    <CollapseContainer oria={false}>
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
