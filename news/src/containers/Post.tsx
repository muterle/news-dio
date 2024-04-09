import { memo, useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { createMarkup } from "../shared/utils";
import { Col, Row } from "antd";

import "./style.css";
import Actions from "./components/Actions";

const Post = () => {
  const navigate = useNavigate();

  const { id, subject } = useParams();
  const [post, setPost] = useState<any>({});
  const [news, setNews] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const renderImg = ({ image, description }: any) => (
    <div>
      <img src={image.url} alt={description} width="75%" />
    </div>
  );

  const handleNews = useCallback((data: any) => {
    setNews(data[0]?.value);
    setPost(data[1]?.value);

    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);

    Promise.allSettled([
      api.getNews(`${subject}`),
      api.getNewsById(`${subject}`, `${id}`),
    ]).then(handleNews);
  }, [id, subject, handleNews]);

  const renderDescription = (description: string) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (id: string) => {
    navigate(`/${subject}/${id}`);
  };

  const renderPost = (post: any, index: number) => {
    const { title, image, description, id } = post;

    return (
      <Col span={12} key={index}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {image?.url
            ? renderImg({ image, description })
            : renderDescription(description)}
        </article>
      </Col>
    );
  };

  if (loading) return <div>Carregando</div>;

  const { title, image, description, body, datePublished } = post;

  return (
    <div>
      <Link to="/">Back</Link>
      <Actions post={post} subject={subject} />
      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          <p>{datePublished}</p>
          <h1 dangerouslySetInnerHTML={createMarkup(title)} />
          {image && renderImg({ image, description })}
          <p
            className="text"
            dangerouslySetInnerHTML={createMarkup(description)}
          />
          <hr />
          <p className="text" dangerouslySetInnerHTML={createMarkup(body)} />
        </Col>
        <Col span={24} md={8}>
          <Row gutter={[16, 16]}>{news?.value?.map(renderPost)}</Row>
        </Col>
      </Row>
    </div>
  );
};

export default memo(Post);
