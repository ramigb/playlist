import React, { useRef, useState, useEffect } from "react";
import List from "../List";
import { PlayListLink } from "../../Types";
import { extractVideoID } from "../../../Utils/Links";

// TODO : Refactor the hell out of this monster ...

const Form = () => {
  const linkInputRef = useRef<HTMLInputElement>(null);
  const initialLinks: PlayListLink[] = [];
  const [links, addLink] = useState(initialLinks);
  const [encodedPage, setEncodedPage] = useState("");
  const [info, setInfo] = useState("");
  const [title, setTitle] = useState("");

  const createPage = (links: PlayListLink[], title: string, info: string) => {
    return {
      t: title,
      i: info,
      l: links.map(link => ({ y: extractVideoID(link.y) }))
    };
  };

  const handleAddLinkClick = () => {
    if (!linkInputRef || !linkInputRef.current || !linkInputRef.current.value)
      return;
    const link = linkInputRef.current.value;
    addLink([...links, { y: link }]);
  };

  const handleLinkKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode != 13) return;
    handleAddLinkClick();
  };

  const encodePage = () => {
    let objJsonStr = JSON.stringify(createPage(links, title, info));
    let objJsonB64 = btoa(objJsonStr);
    setEncodedPage(window.location.origin + "/p/" + objJsonB64);
  };

  useEffect(() => {
    encodePage();
  }, [info, title, links]);

  return (
    <div className="columns">
      <div className="column col-6">
        <h3>YouTube Links</h3>
        <h6>Soon will support Soundcloud and vimeo as well ...</h6>
        <div className="input-group">
          <input
            className="form-input"
            type="text"
            placeholder="link"
            ref={linkInputRef}
            onKeyPress={handleLinkKeyPress}
          />
          <button
            className="btn btn-primary input-group-btn"
            onClick={handleAddLinkClick}
          >
            Add
          </button>
        </div>
        <List links={links} />
      </div>

      <div className="column col-6">
        <h3>Title and Info</h3>
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            placeholder="title"
            onChange={e => setTitle(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-input"
            placeholder="info"
            onChange={e => setInfo(e.currentTarget.value)}
          />
        </div>
        <br /> {/* Dude I will fix this shit I promise! */}
        <br />
        {encodedPage.length > 0 && (
          <>
            <div className="form-group">
              <textarea
                className="form-input"
                readOnly
                placeholder="Final URL"
                value={encodedPage}
              />
            </div>
            <br />
            <br />
            <a href={encodedPage} target="_blank">
              Your PlayList Page
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
