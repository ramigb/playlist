import React from "react";
import ReactPlayer from "react-player";
import { PlayListLink } from "../../Types";

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
      <div
        key={index}
        className="column col-6"
        style={{ marginBottom: "10px" }}
      >
        <ReactPlayer url={urlToLink} light={preview} width="100%" />
      </div>
    );
  };

  return <>{links.map((item, index) => renderItem(item, index))}</>;
}

export default List;
