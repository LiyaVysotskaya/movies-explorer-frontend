import React from "react";
import './Content.css';
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";

function Content(props) {
  return (
    <>
      <div className={`content ${props.mini && 'content_mini'}`}>
        <SecondaryHeader techs={props.techs} title={props.title}></SecondaryHeader>
        {props.children}
      </div>
    </>
  )
}

export default Content;