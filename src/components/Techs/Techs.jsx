import React from "react";
import './Techs.css';
import Content from "../Content/Content";

function Techs() {
  return (
    <section className="techs">
      <Content title='Технологии' techs={true}>
        <h3 className="techs__text">7 технологий</h3>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </Content>
    </section>
  )
}

export default Techs;