import React, { useEffect } from "react";
import { Layout, List, Card } from "antd";
import SideBar from "../components/sidebar";
import TopHeader from "../components/header";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTagsAsync, selectTags, TagState } from "../store/tag/tagSlice";
import { useNavigate } from "react-router-dom";
const numTagsPerRow = 4;
const { Content } = Layout;

const Tags: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tags = useAppSelector(selectTags);

  useEffect(() => {
    dispatch(fetchTagsAsync());
  }, [dispatch]);

  const sliceIntoChunks = (tags: TagState[]) => {
    const res = [];
    for (let i = 0; i < tags.length; i += numTagsPerRow) {
      const chunk = tags.slice(i, i + numTagsPerRow);
      res.push(chunk);
    }
    return res;
  };

  const onClick = (tag: TagState) => {
    navigate(`/posts/tags/${tag.id}`, { state: { tag } });
  };

  const tagsPerRow = sliceIntoChunks(tags);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout className="site-layout">
        <TopHeader />
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 50,
              minHeight: 360,
            }}
          >
            <h1>Tags:</h1>
            {tagsPerRow.map((tags) => (
              <List
                grid={{ gutter: 16 }}
                dataSource={tags}
                style={{ margin: "auto" }}
                renderItem={(item) => (
                  <List.Item>
                    <Card style={{ width: 200 }} onClick={() => onClick(item)}>
                      {item.name}
                    </Card>
                  </List.Item>
                )}
              />
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Tags;
