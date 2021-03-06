import React from 'react';
import { Card, Col, Row, Skeleton, Image, Avatar, Tag, Popover } from 'antd';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const { Meta } = Card;

function Views({ data }) {
  console.log(data);
  const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];
  return (
    <Row gutter={[24, 24]}>
      {data.map((item) => (
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Card
            style={{ maxWidth: 420, minWidth: 250 }}
            bordered={false}
            hoverable
            cover={
              <Image
                src={item.mediaFile}
                preview={{
                  src: item.mediaFile,
                }}
                style={{ maxWidth: 420, minWidth: 250, borderRadius: 5 }}
              />
            }
            actions={item.variantImg.map((img, index) => {
              const random = Math.floor(Math.random() * colors.length);

              return (
                <Popover
                  content={
                    <>
                      <Avatar
                        size={{
                          xs: 24,
                          sm: 24,
                          md: 48,
                          lg: 48,
                          xl: 32,
                          xxl: 32,
                        }}
                        src={img}
                      />
                      <Tag
                        color={colors[random]}
                        style={{
                          marginLeft: 10,
                        }}
                      >
                        {item.variantDetails[index]}
                      </Tag>
                    </>
                  }
                  arrowPointAtCenter
                >
                  {/* <Tag color={colors[random]}>{item.variantDetails[index]}</Tag>
                  
                   */}
                  <Avatar
                    size={{ xs: 24, sm: 24, md: 48, lg: 48, xl: 32, xxl: 32 }}
                    src={img}
                  />
                </Popover>
              );
            })}
          >
            <Link to={`/product/${item._id}`}>
              <Meta title={_.startCase(_.toLower(item.title))} />
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Views;
