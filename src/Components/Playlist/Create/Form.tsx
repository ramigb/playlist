import React, { useRef, useState, useEffect } from "react";
import List from "../List";
import { PlayListLink } from "../../Types";
import { extractVideoID } from "../../../Utils/Links";
import Input from "../../Common/Input";
import TextArea from "../../Common/TextArea";

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
    if (event.charCode !== 13) return;
    handleAddLinkClick();
  };

  const encodePage = () => {
    let objJsonStr = JSON.stringify(createPage(links, title, info));
    let objJsonB64 = btoa(objJsonStr);
    setEncodedPage(window.location.origin + "/p/" + objJsonB64);
  };

  useEffect(() => {
    if (!links.length) return;
    encodePage();
  }, [info, title, links]);

  return (
    <div>
      <div>
        <h3>Title and Info</h3>
        <Input
          placeholder="Title"
          onChange={e => setTitle(e.currentTarget.value)}
        />

        <TextArea
          placeholder="info"
          onChange={e => setInfo(e.currentTarget.value)}
        />

        {encodedPage.length > 0 && (
          <>
            <TextArea readOnly placeholder="Final URL" value={encodedPage} />
            <a href={encodedPage} target="_blank">
              Your PlayList Page
            </a>
          </>
        )}
      </div>

      <div>
        <h3>YouTube Links</h3>
        <h6>Soon will support Soundcloud and vimeo as well ...</h6>
        <div className="input-group">
          <Input
            placeholder="Link"
            myRef={linkInputRef}
            onKeyPress={handleLinkKeyPress}
            onChange={e => setTitle(e.currentTarget.value)}
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
    </div>
  );
};

export default Form;
