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
import { useDispatch, useSelector } from 'react-redux';

function Cart({ cartVisible, setCartVisible }) {
  const carts = useSelector((state) => state.cart);

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
        loading={carts.length === 0}
        itemLayout="horizontal"
        dataSource={carts}
        renderItem={(item) => (
          <List.Item actions={[<DeleteFilled style={{ color: 'red' }} />]}>
            <List.Item.Meta
              avatar={<Avatar src={item.product.mediaFile} />}
              title={_.startCase(_.toLower(item.product.title))}
              description={item.product.seoDescription}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
}

export default Cart;
