import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './layout.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Helmet } from 'react-helmet';

// var result = _.camelCase('toto-ce héros')

const { Header, Content, Footer } = Layout;

const LayoutView = ({ children, page, product }) => {
  function defaultSelectedKeys() {
    if (page === 'Add Product') return '1';
    if (page === 'View Products') return '2';
  }
  function toCamelCase(str) {
    // Lower cases the string
    return (
      str
        .toLowerCase()
        // Replaces any - or _ characters with a space
        .replace(/[-_]+/g, ' ')
        // Removes any non alphanumeric characters
        .replace(/[^\w\s]/g, '')
        // Uppercases the first character in each group immediately following a space
        // (delimited by spaces)
        .replace(/ (.)/g, function ($0) {
          return $0.toUpperCase();
        })
      // Removes spaces
      // .replace(/ /g, '')
    );
  }
  return (
    <>
      {product ? (
        <Helmet>
          {' '}
          <title> {_.startCase(_.toLower(product.seoTitle))}</title>
          <meta name="description" content={_.toLower(product.seoTitle)} />
        </Helmet>
      ) : (
        <Helmet>
          {' '}
          <title>Merchant App</title>
          <meta name="description" content="Lorem ipsum dolor sit amet" />
        </Helmet>
      )}

      <Layout>
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            // backgroundColor: 'white',
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[defaultSelectedKeys]}
          >
            <Menu.Item key="1">
              <Link to="/add">Add</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/view">View</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: '0 50px', marginTop: 64 }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            {page && (
              <Breadcrumb.Item>
                {page === 'Add Product' && <Link to={'/add'}>{page}</Link>}
                {page === 'View Products' && <Link to={'/view'}>{page}</Link>}
              </Breadcrumb.Item>
            )}
            {product ? (
              <Breadcrumb.Item>
                <Link to={`/product/${product._id}`}>
                  {_.startCase(_.toLower(product.title))}
                </Link>
              </Breadcrumb.Item>
            ) : (
              ''
            )}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 470,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Designed By Amit</Footer>
      </Layout>
    </>
  );
};

export default LayoutView;
