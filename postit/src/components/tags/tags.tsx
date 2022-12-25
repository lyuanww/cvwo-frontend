import { Tag } from "antd";
import { TagState } from "../../store/tag/tagSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  tags: TagState[];
}

const Tags = ({ tags }: Props) => {
  const navigate = useNavigate();
  const onClick = (tag: TagState) => {
    navigate(`/posts/tags/${tag.id}`, { state: { tag } });
  };
  return (
    <div style={{ margin: 20 }}>
      <span style={{ marginRight: 8 }}>Tags:</span>
      {tags.map((tag: any) => (
        <Tag onClick={() => onClick(tag)} key={tag.name}>
          {tag.name}
        </Tag>
      ))}
    </div>
  );
};

export default Tags;
