import React from 'react';
import { Drawer, Button, List, Avatar, Skeleton } from 'antd';

function Cart({}) {
  return (
    <Drawer title="Cart" placement="right" onClose={() => {}} visible={true}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}

export default Cart;
