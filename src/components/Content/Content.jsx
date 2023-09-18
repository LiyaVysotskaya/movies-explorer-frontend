import React from "react";
import './Content.css';
import SecondaryHeader from "../SecondaryHeader/SecondaryHeader";

function Content(props) {
  console.log(props)
  return (
    <>
      <div className={`content ${props.techs && 'content_techs'}`}>
        <SecondaryHeader title={props.title}></SecondaryHeader>
        {props.children}
      </div>
    </>
  )
}

export default Content;