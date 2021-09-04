import React from 'react';
import {
  Card,
  Col,
  Row,
  Skeleton,
  Image,
  Button,
  Typography,
  Divider,
  Avatar,
  Tag,
} from 'antd';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import HtmlParse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './../../actions/cart';

const { Meta } = Card;
const { Title, Paragraph, Text, Link } = Typography;
const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];

function ProductComponent({ product }) {
  const dispatch = useDispatch();

  return (
    <Row gutter={[48, 38]} justify="center">
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Image
          src={product.mediaFile}
          preview={{
            src: product.mediaFile,
          }}
          style={{ maxWidth: 400, minWidth: 250, borderRadius: 5 }}
        />
      </Col>
      <Col xs={24} sm={24} md={6} lg={8} xl={8}>
        <Title>{_.startCase(_.toLower(product.title))}</Title>
        <Divider />
        <Paragraph>{HtmlParse(product.description)}</Paragraph>
        <Divider />

        <Row gutter={[48, 38]}>
          {product.variantImg.map((img, index) => {
            const random = Math.floor(Math.random() * colors.length);
            return (
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Avatar
                  size={{
                    xs: 12,
                    sm: 26,
                    md: 30,
                    lg: 36,
                    xl: 40,
                    xxl: 48,
                  }}
                  src={img}
                  style={{
                    marginLeft: 5,
                  }}
                />
                <Tag
                  color={colors[random]}
                  style={{
                    marginTop: 10,
                    marginLeft: 5,
                  }}
                >
                  {product.variantDetails[index]}
                </Tag>
              </Col>
            );
          })}
        </Row>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={4}
        xl={4}
        style={{
          padding: 24,
        }}
      >
        <Button
          type="primary"
          block
          style={{
            marginTop: 30,
          }}
          onClick={() => {
            dispatch(addToCart(product));
          }}
        >
          Add To Cart
        </Button>
      </Col>
    </Row>
  );
}

export default ProductComponent;
