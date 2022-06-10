import { List } from 'antd';

const CommentList = ({ comments }) => {
  const data = comments.map((comment) => {
    return {
      content: comment.content,
    };
  });

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      style={{ marginBlock: '2em' }}
      renderItem={(item) => (
        <List.Item
          style={{
            padding: '0.25em',
          }}
        >
          <List.Item.Meta title={item.content} />
        </List.Item>
      )}
    />
  );
};

export default CommentList;
