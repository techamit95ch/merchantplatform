import React from 'react';
import { Card, Col, Row, Skeleton, Image, Avatar, Tag, Popover } from 'antd';
import parse from 'html-react-parser';

const { Meta } = Card;

function Views({ data }) {
  console.log(data);
  const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];
  return (
    <Row justify="center" gutter={[24, 24]}>
      {data.map((item) => (
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Card
            // style={{ width: 390, marginTop: 0 }}
            bordered={false}
            hoverable
            cover={
              <Image
                src={item.mediaFile}
                preview={{
                  src: item.mediaFile,
                }}
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
                      <Tag color={colors[random]}>
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
            <Meta title={item.title} />
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Views;
