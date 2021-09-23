import React, { FC, useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import { oriaKeyword } from '../services/api';

const StyledCollapseContainer = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 5px;
  border: thin solid rgb(0, 0, 0);
  font-size: 15px;
  &.oria {
  }
`;

const StyledContents = styled.div`
  font-family: Barlow, sans-serif;
  margin-top: 0.5rem;
  margin-bottom: 0;
  padding: 1rem;
  border-radius: 5px;
`;

const StyledCollapseButton = styled.button`
  && {
    width: 100%;
    display: inline-block;
    background-color: #fafafa;
    color: rgb(40, 75, 99);
    text-align: left;
    font-family: Barlow, sans-serif;
    font-size: 20px;
    font-weight: bold;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    outline: none;
    cursor: pointer;
    border: none;
    &.oria {
      color: rgb(0, 0, 0);
      border-color: rgb(0, 0, 0);
      font-weight: bold;
      font-size: 15px;
    }
    &:hover {
      background-color: #eeeeee;
    }
    &:focus {
      background-color: #e0e0e0;
    }
  }
`;
const StyledChevronWrapper = styled.span`
  margin: 0 0.5rem;
`;

const StyledButtonContent = styled.div`
  display: flex;
`;
interface CollapsedBoxProps {
  name: string;
  summary?: string;
  contents?: string[];
  mp3File?: string;
  open: boolean;
  oriaParameterIsSet: boolean;
  dataTestid?: string;
}

const CollapsedBox: FC<CollapsedBoxProps> = ({
  name,
  summary,
  contents,
  mp3File,
  open,
  oriaParameterIsSet,
  dataTestid,
}) => {
  const [collapsed, setcollapsed] = useState(!open);

  const handleButtonClick = () => {
    setcollapsed(!collapsed);
  };

  return (
    <StyledCollapseContainer data-Testid={dataTestid} className={oriaParameterIsSet ? oriaKeyword : ''}>
      <StyledCollapseButton
        className={oriaParameterIsSet ? oriaKeyword : ''}
        aria-expanded={!collapsed}
        role="knapp"
        onClick={handleButtonClick}>
        <StyledButtonContent>
          <StyledChevronWrapper>{!collapsed ? <FaChevronDown /> : <FaChevronRight />}</StyledChevronWrapper>
          {name}
        </StyledButtonContent>
      </StyledCollapseButton>
      {!collapsed && (
        <>
          {summary && (
            <StyledContents data-testid={`${dataTestid}-summary`} aria-relevant="text">
              {summary}
            </StyledContents>
          )}
          {contents && (
            <StyledContents data-testid={`${dataTestid}-contents`} aria-relevant="text">
              {contents.map((value, index) => {
                return <p key={index}>{value}</p>;
              })}
            </StyledContents>
          )}
          {!collapsed && mp3File && (
            <StyledContents data-testid={`${dataTestid}-audio`}>
              <audio controls controlsList="nodownload">
                <source src={mp3File} type="audio/mpeg" />
              </audio>
            </StyledContents>
          )}
        </>
      )}
    </StyledCollapseContainer>
  );
};

export default CollapsedBox;
