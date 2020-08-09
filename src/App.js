import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import Form from './components/Form';
import List from './components/List';
import './App.scss';
import Api from './api';
import { endpoints } from './endpoints';
import 'antd/dist/antd.css';

function App() {
  const [editItem, setEditItem] = useState();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = () => {
    setEditItem();
    setIsLoading(true);
    Api({
      endpoint: endpoints.getAll(),
      onSuccess: (response) => {
        setList(response.data);
        setIsLoading(false);
      },
      onError: () => setIsLoading(true)
    })
  }
  useEffect(() => { refresh() }, []);

  return (
    <div className="container">
      <div className="header">Hotel CRUD system</div>
      <Row>
        <Col span={5} className="small-padding" style={{ borderColor: 'red', borderWidth: '1em' }}>
          <Form editItem={editItem} setEditItem={setEditItem} refresh={refresh} />
        </Col>
        <Col span={19} className="small-padding">
          <div>Hotels List</div>
          <List editItem={editItem} setEditItem={setEditItem} list={list} isLoading={isLoading} setIsLoading={setIsLoading} refresh={refresh} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
