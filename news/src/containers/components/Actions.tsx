import { memo, useEffect, useState } from "react";
import SharedIcon from "../../shared/images/share.svg";
import CopyIcon from "../../shared/images/copy.svg";

const URL = "http://localhost:3000";

const Actions = ({ post, subject }: any) => {
  const { id, title } = post;

  const [canShare, setCanShare] = useState<any | undefined>(undefined);
  useEffect(() => {
    setCanShare(navigator.share);
  }, []);

  const shareInfo = () => {
    navigator.share({
      title: `News - ${subject}`,
      text: title,
      url: URL,
    });
  };

  const copyInfo = () => {
    navigator.clipboard.writeText(
      `${title} - *Learn more about in* ${URL}/${subject}/${id}`
    );
  };

  const renderActions = () => {
    const action = canShare ? shareInfo : copyInfo;
    const icon = canShare ? SharedIcon : CopyIcon;

    return (
      <img src={icon} alt="icon" className="share-icon" onClick={action} />
    );
  };

  return <div className="share">{renderActions()}</div>;
};

export default memo(Actions);
