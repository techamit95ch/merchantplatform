import React from 'react';
import { Drawer, Button, List, Avatar, Skeleton, Typography } from 'antd';
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
  DeleteFilled,
} from '@ant-design/icons';
import _ from 'lodash';

function Cart({ cartVisible, setCartVisible }) {
  const data = [];
  return (
    <Drawer
      title="Cart"
      placement="right"
      onClose={() => {
        setCartVisible(false);
      }}
      visible={cartVisible}
    >
      <List
        className="demo-loadmore-list"
        loading={data.length === 0}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={[<DeleteFilled style={{ color: 'red' }} />]}>
            <List.Item.Meta
              avatar={<Avatar src={item.mediaFile} />}
              title={_.startCase(_.toLower(item.title))}
              description={item.seoDescription}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
}

export default Cart;
