import React from 'react';
import { Row, Col, Input, InputNumber, Typography } from 'antd';
import InsertForm from './components/InsertForm';
import './App.scss';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="container">
      <div className="header">Hotel CRUD system</div>
      <Row style={{ width: '100%' }}>
        <Col span={6}>
          <InsertForm />
        </Col>
        <Col span={18}>
          <div>Hotels List</div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
