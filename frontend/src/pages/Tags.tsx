import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, List, Card } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTagsAsync, selectTags, TagState } from "../store/tag/tagSlice";
import SideBar from "../components/sidebar";
import TopHeader from "../components/header";

const { Content } = Layout;

const numTagsPerRow = 4;

const Tags: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tags = useAppSelector(selectTags);

  useEffect(() => {
    dispatch(fetchTagsAsync());
  }, [dispatch]);

  //Slice the tags into rows of certain number
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
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <SideBar />
      <Layout className="site-layout">
        <TopHeader />
        <Content
          style={{
            alignSelf: "center",
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 50,

              minHeight: 100,
            }}
          >
            <h1>Tags:</h1>

            {tagsPerRow.map((tags) => (
              <List
                grid={{ gutter: 12 }}
                dataSource={tags}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      style={{
                        width: 200,
                      }}
                      onClick={() => onClick(item)}
                    >
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
