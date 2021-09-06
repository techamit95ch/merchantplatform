import React from "react";
import LayoutView from "../components/Layout/LayoutView";
import { Card, Col, Row, Button } from "antd";

import addForm from "../images/addForm.png";
import viewProducts from "../images/viewProducts.png";
import productconcept from "../images/Product-concept.jpg";
import "./homescreen.css";
import { Link, useHistory } from "react-router-dom";

export default function HomeScreen() {
  const [darkenedCard, setDarkenedCard] = React.useState("");
  const [linkTo, setLinkTo] = React.useState("");
  const [isButton, setIsButton] = React.useState(false);
  const [cardId, setCardId] = React.useState(0);
const history= useHistory();
  const linakble = (hrefLink, cId) => {
    setLinkTo(hrefLink);
    setIsButton(true);
    setDarkenedCard("darkenedCard");
    setCardId(cId);
  };
  const reomoveLinakble = () => {
    setLinkTo("");
    setIsButton(false);
    setDarkenedCard("");
    setCardId(0);
  };
  return (
    <LayoutView page={""}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {/* <Image.PreviewGroup> */}
          <Card
            style={{
              maxWidth: 500,
              minWidth: 500,
              maxHeight: 400,
              minHeight: 400,
            }}
            bordered={false}
            hoverable
            className={cardId === 1 && darkenedCard}
            title="Add Product"
            onMouseEnter={() => linakble("add", 1)}
            onMouseLeave={reomoveLinakble}
            onClick={() =>history.push('add')}
            cover={
              <img
                src={addForm}
                style={{
                  maxWidth: 420,
                  minWidth: 250,
                  borderRadius: 5,
                  maxHeight: 340,
                  minHeight: 340,
                }}
              />
            }></Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card
            style={{
              maxWidth: 500,
              minWidth: 500,
              maxHeight: 400,
              minHeight: 400,
            }}
            className={cardId === 2 && darkenedCard}
            title="View Products"
            bordered={false}
            hoverable
            onClick={() =>history.push('view')}

            onMouseEnter={() => linakble("view", 2)}
            onMouseLeave={reomoveLinakble}
            cover={
              <img
                src={productconcept}
                style={{
                  maxWidth: 420,
                  minWidth: 250,
                  maxHeight: 340,
                  minHeight: 340,
                  borderRadius: 5,
                }}
              />
            }></Card>
          {/* </Image.PreviewGroup>/ */}
        </Col>
      </Row>
    </LayoutView>
  );
}
