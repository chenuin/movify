import React from 'react';
import {List, Avatar, Space, Typography, Rate} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import type {Review} from '@/hooks/useMovies';

interface MovieReviewProps {
  list: Review[]
}

const MovieReview: React.FC<MovieReviewProps> = ({list}) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={list}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={
              // 根據 avatar_path 是否存在來決定顯示圖片或預設圖示
              item.author_details.avatar_path ? (
                <Avatar
                  src={`https://image.tmdb.org/t/p/w500${item.author_details.avatar_path}`}
                  alt={item.author_details.username}
                />
              ) : (
                <Avatar icon={<UserOutlined />} />
              )
            }
            title={
              <Space direction="vertical" size={2}>
                <Typography.Text strong>{item.author}</Typography.Text>
                {item.author_details.rating !== null && (
                  <Rate allowHalf disabled defaultValue={item.author_details.rating / 2} />
                )}
              </Space>
            }
            description={`Reviewed on ${new Date(item.created_at).toLocaleDateString()}`}
          />
          <Typography.Paragraph>
            {item.content}
          </Typography.Paragraph>
        </List.Item>
      )}
    />
  );
};

export default MovieReview;
