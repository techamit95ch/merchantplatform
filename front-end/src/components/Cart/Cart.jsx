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
import { removeFromCart, orderAllCart } from './../../actions/cart';

function Cart({ cartVisible, setCartVisible }) {
  const carts = useSelector((state) => state.cart);
  // console.log(carts);
  const dispatch = useDispatch();
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
        size="large"
        rowKey={(item, index) => {
          console.log(item, index);
          return index;
        }}
        loading={carts.length === 0}
        itemLayout="horizontal"
        dataSource={carts}
        // bordered
        footer={
          <>
            <Button
              type="primary"
              block
              onClick={() => {
                dispatch(orderAllCart());
              }}
            >
              Order
            </Button>
          </>
        }
        renderItem={(item) => (
          <List.Item
            actions={[
              <DeleteFilled
                style={{ color: 'red' }}
                onClick={() => {
                  dispatch(removeFromCart(item._id));
                }}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item ? item.product.mediaFile : ''} />}
              title={item ? _.startCase(_.toLower(item.product.title)) : ``}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
}

export default Cart;
