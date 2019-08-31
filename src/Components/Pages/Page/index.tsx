import React from "react";
import { match } from "react-router-dom";
import List from "../../Playlist/List";
import { PlayListLink } from "../../Types";
import { b64DecodeUnicode } from "../../../Utils/Base64";

interface OwnProps {
  match?: match<any>;
}

function Page(props: OwnProps) {
  const { match } = props;
  const decodedPage =
    match && match.params && match.params.encodedPage
      ? JSON.parse(b64DecodeUnicode(match.params.encodedPage))
      : false;

  console.log("D", decodedPage);
  if (!decodedPage) {
    return null;
  }

  //Put somewhere else
  function makeLink(links: any[]) {
    return links.map((l, i) => {
      return {
        y: "https://www.youtube.com/watch?v=" + l.y,
        id: i
      } as PlayListLink;
    });
  }

  return (
    <div>
      <h3>{decodedPage.t}</h3>
      <p>{decodedPage.i}</p>
      <div className="container">
        <div className="columns">
          <List links={makeLink(decodedPage.l)} preview={true} />
        </div>
      </div>
    </div>
  );
}

export default Page;
