import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LayoutView from '../components/Layout/LayoutView';
import SkeletonViews from '../components/Views/SceletonViews';
import Views from '../components/Views/Views';
import { Empty, Button } from 'antd';
import { Link } from 'react-router-dom';

const ViewProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 2000);
  }, [ready]);
  return (
    <LayoutView page={'View Products'}>
      {!ready ? (
        <SkeletonViews />
      ) : (
        <>
          {products.data.length > 0 ? (
            <Views data={products.data} />
          ) : (
            <>
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
              >
                <Link to="/add">
                  <Button type="primary">Create Now</Button>
                </Link>
              </Empty>
            </>
          )}
        </>
      )}
    </LayoutView>
  );
};

export default ViewProducts;
