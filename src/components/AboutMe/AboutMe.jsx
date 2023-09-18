import React from "react";
import { Link } from "react-router-dom";
import './AboutMe.css';
import Content from "../Content/Content";
import photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <section className="student">
      <Content title='Студент'>
        <h3 className="student__text">Виталий</h3>
        <p className="student__introducing">Фронтенд-разработчик, 30 лет</p>
        <p className="student__description">
          Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ.
          У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
          С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
          После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
        </p>
        <Link className='student__link-github' to='#'>Github</Link>
        <img className="student__photo" alt="Фотография студента" src={photo}></img>
      </Content>
    </section>
  )
}

export default AboutMe;