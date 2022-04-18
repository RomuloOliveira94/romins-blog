import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import styles from "./EditPost.module.css";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);

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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    //redirect to home page
    navigate("/dashboard");
  };
  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando: {post.title}</h2>
          <p>Faça suas alterações</p>
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
              <p className={styles.preview_title}>Imagem:</p>
              <img
                className={styles.image_preview}
                src={post.image}
                alt={post.title}
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

            {!response.loading && <button className="btn">Salvar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
