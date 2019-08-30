import React from "react";
import { Route, BrowserRouter as Router, Link, match } from "react-router-dom";
import List from "../../Playlist/List";
import { PlayListLink } from "../../Types";

interface OwnProps {
  match?: match<any>;
}

function Page(props: OwnProps) {
  const { match } = props;
  const decodedPage =
    match && match.params && match.params.encodedPage
      ? JSON.parse(atob(match.params.encodedPage))
      : false;

  console.log(decodedPage);
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
          <List links={makeLink(decodedPage.l)} preview={false} />
        </div>
      </div>
    </div>
  );
}

export default Page;