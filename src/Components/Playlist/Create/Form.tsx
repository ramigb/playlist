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
  const maxInfoText = 300;

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
        <div className="columns">
          <div className="column col-lg-6 col-sm-12" style={{marginBottom: "12px"}}>
          <Box gap="small">
            <Input              
              placeholder="Title"
              maxLength={200}
              onChange={e => setTitle(e.currentTarget.value)}
            />

            <TextArea
              placeholder="info"
              maxLength={200}
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
              <Box gap="small">
                {/* <TextArea
                  readOnly
                  placeholder="Final URL"
                  value={encodedPage}
                /> */}
                <a href={encodedPage} className="btn btn-primary" target="_blank">
                  Open PlayList In a new tab
                </a>
              </Box>
            )}
          </Box>
          </div>
          <div className="column col-lg-6 col-sm-12">            
            <List links={links} className="column col-12" />            
          </div>
        </div>      
  );
};

export default Form;
