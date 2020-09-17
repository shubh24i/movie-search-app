import React from "react";
const Image = (props) => {

  return (
    <img className={props.classes} src={props.source} onClick={props.clicked} alt={props.altName} />
  );
};

export default Image;
