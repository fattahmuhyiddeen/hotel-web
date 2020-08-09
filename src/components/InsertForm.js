import React, { useState } from 'react';
import { Row, Col, Input, Typography } from 'antd';

const { Title } = Typography;
function App() {
  const [name, setName] = useState('')
  const [validity, setValidity] = useState('')
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  return (
    <>
      <Title level={4}>Add New Hotel Form</Title>
      <Input value={name} addonBefore="Name" onChange={e => setName(e.target.value)} />
      <Input value={validity} addonBefore="Validity" onChange={e => setValidity(e.target.value)} />
      <Input value={duration} addonBefore="Duration" onChange={e => setDuration(e.target.value)} />
      <Input value={price} addonBefore="Price" onChange={e => setPrice(e.target.value)} />
      <Input.TextArea value={description} placeholder="Description" rows={4} onChange={e => setDescription(e.target.value)} />
    </>
  );
}

export default App;
