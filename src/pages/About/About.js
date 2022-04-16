import React from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.About}>
      <h1>
        Sobre o Romin's <span>Blog</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
        perferendis est eius tenetur fugit magni explicabo quia dolores
        exercitationem, quasi natus voluptates repellendus dolore tempora
        tempore aut soluta expedita ut.
      </p>
      <Link to="/posts/create" className="btn">Crie uma postagem</Link>
    </div>
  );
};

export default About;
