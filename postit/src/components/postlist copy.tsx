import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import "./postlist.css";

const { Meta } = Card;
interface DataType {
  body?: string;
  title?: string;
  nat?: string;
  loading: boolean;
}

const LIMIT = 1;
function getAPIData() {
  return axios.get(fakeDataUrl).then((response) => response.data);
}
const fakeDataUrl = "http://localhost:3000/api/v1/users";

const PostList: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [list, setList] = useState<DataType[]>([]);
  const [index, setIndex] = useState(LIMIT);

  useEffect(() => {
    let mounted = true;
    getAPIData().then((items: any) => {
      if (mounted) {
        const newList = items.slice(0, LIMIT);
        setInitLoading(false);
        setList(newList);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      list.concat(
        [...new Array(LIMIT)].map(() => ({
          loading: true,
          body: "",
          title: "",
        }))
      )
    );
    {
      let mounted = true;
      getAPIData().then((items: any) => {
        if (mounted) {
          const newIndex =
            index + LIMIT > items.length ? items.length : index + LIMIT;
          const newList = list.concat(items.slice(index, newIndex));
          const stopLoad = items.length === newIndex;
          setList(newList);
          setLoading(stopLoad);
          setIndex(newIndex);

          window.dispatchEvent(new Event("resize"));
        }
      });
      return () => {
        mounted = false;
      };
    }
  };

  const loadMore =
    !initLoading && !loading ? (
      <div className="footer">
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : (
      <div className="footer"> END </div>
    );

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <Skeleton avatar title={false} loading={item.loading} active>
          <Card style={{ margin: "auto", width: 700 }}>
            <Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.body}
            />
          </Card>
        </Skeleton>
      )}
    />
  );
};

export default PostList;
