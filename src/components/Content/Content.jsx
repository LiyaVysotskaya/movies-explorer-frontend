import React from "react";
import './Content.css';
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";

function Content(props) {
  return (
    <>
      <div className={`content ${props.techs && 'content__techs'}`}>
        <SecondaryHeader title={props.title}></SecondaryHeader>
        {props.children}
      </div>
    </>
  )
}

export default Content;