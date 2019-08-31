import React, { useRef, useState, useEffect } from "react";
import List from "../List";
import { PlayListLink } from "../../Types";
import { extractVideoID } from "../../../Utils/Links";
import Input from "../../Common/Input";
import TextArea from "../../Common/TextArea";
import { Box, Grid, ResponsiveContext } from "grommet";
import { b64EncodeUnicode } from "../../../Utils/Base64";

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

  useEffect(() => {
    if (!links.length) return;
    const encodePage = () => {
      let objJsonStr = JSON.stringify(createPage(links, title, info));
      let objJsonB64 = b64EncodeUnicode(objJsonStr);
      setEncodedPage(window.location.origin + "/p/" + objJsonB64);
    };
    encodePage();
  }, [info, title, links]);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Grid
          areas={[
            { name: "form", start: [0, 0], end: [0, 0] },
            { name: "list", start: [1, 0], end: [1, 0] }
          ]}
          columns={size === "small" ? ["full"] : ["2/2", "2/2"]}
          rows={["flex"]}
          gap={size === "small" ? "none" : "small"}
        >
          <Box gridArea="form">
            <Input
              placeholder="Title"
              onChange={e => setTitle(e.currentTarget.value)}
            />

            <TextArea
              placeholder="info"
              onChange={e => setInfo(e.currentTarget.value)}
            />

            <h6>
              For now only YouTube Links will work ... Soon will support
              Soundcloud and vimeo as well ...
            </h6>

            <div className="input-group">
              <Input
                placeholder="Link"
                myRef={linkInputRef}
                onKeyPress={handleLinkKeyPress}
              />
              <button
                className="btn btn-primary input-group-btn"
                onClick={handleAddLinkClick}
              >
                Add
              </button>
            </div>

            {encodedPage.length > 0 && (
              <>
                <TextArea
                  readOnly
                  placeholder="Final URL"
                  value={encodedPage}
                />
                <a href={encodedPage} target="_blank" rel="noopener noreferrer">
                  Your PlayList Page
                </a>
              </>
            )}
          </Box>

          <Box gridArea="list">
            <List links={links} />
          </Box>
        </Grid>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default Form;
