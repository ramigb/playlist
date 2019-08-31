import React from "react";
import ReactPlayer from "react-player";
import { PlayListLink } from "../../Types";
import styled from "styled-components";

const PlayerContainer = styled.div`
  min-height: 320px;
  min-width: 640px;
  margin: 8px;
  .react-player__preview {
    min-height: 320px; /*For some reason 100% doesn't work, FMR? */
  }
`;

interface OwnProps {
  links: PlayListLink[];
  preview?: boolean;
}

function List(props: OwnProps) {
  const { links, preview = true } = props;

  if (!links) return null;

  const renderItem = (item: PlayListLink, index: number) => {
    let urlToLink: string = "";

    if (item.y) urlToLink = item.y;
    if (item.s) urlToLink = item.s;
    if (item.v) urlToLink = item.v;

    return (
      <PlayerContainer key={index}>
        <ReactPlayer
          url={urlToLink}
          light={preview}
          controls
          height="100%"
          width="100%"
        />
      </PlayerContainer>
    );
  };

  return <>{links.map((item, index) => renderItem(item, index))}</>;
}

export default List;
