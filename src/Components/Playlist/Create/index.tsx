import React from "react";
import Form from "./Form";

const Create = () => {
  return (
    <div>
      <h3>
        Create A Playlist{" "}
        <span>
          (Or watch a{" "}
          <a
            target="_blank"
            href="https://www.youtube.com/watch?v=piTaDc36rUM&feature=youtu.be"
          >
            video
          </a>{" "}
          on how to do so)
        </span>
      </h3>
      <Form />
    </div>
  );
};

export default Create;
