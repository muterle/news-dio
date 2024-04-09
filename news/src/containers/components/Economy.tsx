import { memo } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { createMarkup } from "../../shared/utils";

const Economy = ({ values }: any) => {
  const navigate = useNavigate();

  const renderImg = ({ image, description }: any) => (
    <div>
      <img src={image.url} alt={description} width="100%" />
    </div>
  );

  const renderDescription = (description: string) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (id: string) => {
    navigate(`/economy/${id}`);
  };

  const renderPost = (post: any) => {
    const { title, image, description, id } = post;

    return (
      <Col key={id} span={24} md={6}>
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

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
};

Economy.defaultProps = {
  values: [],
};

Economy.propTypes = {
  values: PropTypes.array.isRequired,
};

export default memo(Economy);
