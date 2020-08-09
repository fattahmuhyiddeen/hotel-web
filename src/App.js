import React, { useState } from 'react';
import { Row, Col, Input, InputNumber, Typography } from 'antd';
import Form from './components/Form';
import List from './components/List';
import './App.scss';
import 'antd/dist/antd.css';

function App() {
  const [editItem, setEditItem] = useState();
  return (
    <div className="container">
      <div className="header">Hotel CRUD system</div>
      <Row style={{ width: '100%' }}>
        <Col span={7} style={{ padding: '1em' }}>
          <Form editItem={editItem} setEditItem={setEditItem} />
        </Col>
        <Col span={17} style={{ padding: '1em' }}>
          <div>Hotels List</div>
          <List editItem={editItem} setEditItem={setEditItem} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
