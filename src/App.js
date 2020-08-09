import React, { useState } from 'react';
import { Row, Col } from 'antd';
import Form from './components/Form';
import List from './components/List';
import './App.scss';
import 'antd/dist/antd.css';

function App() {
  const [editItem, setEditItem] = useState();
  return (
    <div className="container">
      <div className="header">Hotel CRUD system</div>
      <Row>
        <Col span={7} className="small-padding">
          <Form editItem={editItem} setEditItem={setEditItem} />
        </Col>
        <Col span={17} className="small-padding">
          <div>Hotels List</div>
          <List editItem={editItem} setEditItem={setEditItem} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
