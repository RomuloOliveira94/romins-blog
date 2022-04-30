import React from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.About}>
      <h1>
        Sobre o Romin's <span>Blog</span>
      </h1>
      <div>
        <p>
          Prazer, me chamo Rômulo, sou desenvolvedor fullstack focado em
          front-end.
        </p>
        <p>
          Extremamente motivado, em constante desenvolvimento de minhas
          habilidades e crescimento profissional. Confio em minhas habilidades e
          desejo seguir carreira como desenvolvedor resolvendo problemas através
          da tecnologia.
        </p>
        <p>
          Atualmente estou cursando analise e desenvolvimentos de sistemas, e
          trabalhando como desenvolvedor freelancer, desenvolvendo sistemas web.
        </p>
        <h2>Skills:</h2>
        <h3>
          HTML5 <br /> CSS3, SASS, Styled Components, Bulma
          <br /> JavaScript - ES6 and TypeScript
          <br /> Node.JS
        </h3>
        <h3>
          Frameworks:<br /> React.js and React Native
          <br /> Vue.JS
          <br /> Bootstrap
        </h3>
        <h3>
          Base de dados:<br /> MongoDB,
          <br /> Firebase
        </h3>
      </div>
      <Link to="/posts/create" className="btn">
        Crie uma postagem
      </Link>
    </div>
  );
};

export default About;
