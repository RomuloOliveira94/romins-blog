import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocuments";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validate img url
    try {
      new URL(image);
    } catch (e) {
      setFormError("A imagem precisa ser uma url");
    }
    //criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    //checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor preencha todos os campos.");
    }
    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    //redirect to home page
    navigate("/")
  };
  return (
    <div className={styles.create_post}>
      <h2>Faça uma postagem</h2>
      <p>Compartilhe conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo: </span>
          <input
            type="text"
            placeholder="Pense em algo legal"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Url da imagem: </span>
          <input
            type="text"
            placeholder="Coloque aqui a url da imagem do seu post"
            name="imagem"
            value={image}
            required
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          <span>Conteúdo: </span>
          <input
            type="textarea"
            placeholder="Coloque aqui o texto do seu post"
            name="body"
            value={body}
            required
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <label>
          <span>Tags: </span>
          <input
            type="text"
            placeholder="Insira tags separadas por vírgulas"
            name="tags"
            value={tags}
            required
            onChange={(e) => setTags(e.target.value)}
          />
        </label>

        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
