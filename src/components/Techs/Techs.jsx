import React from "react";
import './Techs.css';
import Content from "../Content/Content";

function Techs() {
  return (
    <section className="techs" id='techs'>
      <Content title='Технологии' mini={true} techs={true} >
        <h3 className="techs__text">7 технологий</h3>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__element">HTML</li>
          <li className="techs__element">CSS</li>
          <li className="techs__element">JS</li>
          <li className="techs__element">React</li>
          <li className="techs__element">Git</li>
          <li className="techs__element">Express.js</li>
          <li className="techs__element">mongoDB</li>
        </ul>
      </Content>
    </section>
  )
}

export default Techs;