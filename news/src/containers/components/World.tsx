import { memo } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { createMarkup } from "../../shared/utils";

const World = ({ values }: any) => {
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
    navigate(`/world/${id}`);
  };

  const renderPost = (post: any, index: number) => {
    const { title, image, description, id } = post;
    const isFirst = index === 0;
    const spanValue = isFirst ? 24 : 12;

    return (
      <Col key={id} span={spanValue}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {isFirst && image?.url
            ? renderImg({ image, description })
            : renderDescription(description)}
        </article>
      </Col>
    );
  };

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
};

World.defaultProps = {
  values: [],
};

World.propTypes = {
  values: PropTypes.array.isRequired,
};

export default memo(World);
