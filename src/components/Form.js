import React, { useState, useEffect } from 'react';
import { Input, Typography, Button, Space } from 'antd';
import { SaveOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import Api from '../api';
import { endpoints } from '../endpoints';

const { Title } = Typography;
function Form(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [validity, setValidity] = useState('')
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (!!props.editItem) {
      setName(props.editItem.name);
      setValidity(props.editItem.validity);
      setDuration(props.editItem.duration);
      setDescription(props.editItem.description);
      setPrice(props.editItem.price);
    } else {
      reset();
    }
  }, [props.editItem]);

  const reset = () => {
    setName('');
    setValidity('');
    setDuration('');
    setDescription('');
    setPrice('');
    props.setEditItem();
  }

  const insert = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    Api({
      endpoint: endpoints.insert(),
      data: { name, validity, duration, price, description },
      onSuccess: (response) => {
        reset();
        setIsLoading(false);
      },
      onFail: () => setIsLoading(false)
    })
  }

  const update = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    Api({
      endpoint: endpoints.update(props.editItem.id),
      data: { name, validity, duration, price, description },
      onSuccess: () => {
        reset();
        setIsLoading(false);
      },
      onFail: () => setIsLoading(false)
    })
  }
  const isEditing = !!props.editItem?.id
  return (
    <Space size="small" direction="vertical">
      <Title level={4}>{isEditing ? 'Editing: ' + props.editItem.name : 'Add New Hotel Form'}</Title>
      <Input value={name} addonBefore="Name" onChange={e => setName(e.target.value)} />
      <Input value={validity} addonBefore="Validity" onChange={e => setValidity(e.target.value)} />
      <Input value={duration} addonBefore="Duration" onChange={e => setDuration(e.target.value)} />
      <Input value={price} addonBefore="Price" onChange={e => setPrice(e.target.value)} />
      <Input.TextArea value={description} placeholder="Description" rows={4} onChange={e => setDescription(e.target.value)} />
      <div className="spread-row">
        <Button onClick={reset} shape="round" icon={<CloseCircleOutlined />} size={10}>
          Cancel
        </Button>
        <Button onClick={isEditing ? update : insert} type="danger" shape="round" icon={isLoading ? <LoadingOutlined /> : <SaveOutlined />} size={10}>
          {isEditing ? 'Update' : 'Insert'}
        </Button>
      </div>
    </Space>
  );
}

export default Form;
