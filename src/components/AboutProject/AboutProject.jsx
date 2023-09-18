import React from "react";
import './AboutProject.css';
import Content from "../Content/Content";

function AboutProject() {
  return (
    <section className="about">
      <Content title='О проекте'>
        <div className="about__container-description">
          <h3 className="about__text">Дипломный проект включал 5 этапов</h3>
          <h3 className="about__text">На выполнение диплома ушло 5 недель</h3>
          <p className="about__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className="about__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about__container-deadlines">
          <p className="about__time about__time-dark">1 неделя</p>
          <p className="about__time">4 недели</p>
          <p className="about__stage">Back-end</p>
          <p className="about__stage">Front-end</p>
        </div>
      </Content>
    </section>
  )
}

export default AboutProject;