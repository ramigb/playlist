import React from "react";
import ReactPlayer from "react-player";
import { PlayListLink } from "../../Types";
import styled from "styled-components";

const PlayerContainer = styled.div`
  height: 320px;  
  margin-bottom: 8px;
  .react-player__preview {
    display: flex;
  }
  @media (max-width: 768px) {
    height: 160px;    
    width:100%;    
  }
`;

interface OwnProps {
  links: PlayListLink[];
  preview?: boolean;
  className?: string;
}

function List(props: OwnProps) {
  const { links, preview = true, className="col-12" } = props;

  if (!links) return null;

  const renderItem = (item: PlayListLink, index: number) => {
    let urlToLink: string = "";

    if (item.y) urlToLink = item.y;
    if (item.s) urlToLink = item.s;
    if (item.v) urlToLink = item.v;

    return (
      <PlayerContainer key={index} className={className}>
        <ReactPlayer
          url={urlToLink}
          light={preview}
          controls
          width="100%"
          height="100%"
        />
      </PlayerContainer>
    );
  };

  return <>{links.map((item, index) => renderItem(item, index))}</>;
}

export default List;
