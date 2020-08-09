import React, { useState, useEffect } from 'react';
import { Input, Typography, Button, Space } from 'antd';
import { SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
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
      setDuration(props.editItem.description);
      setDescription(props.editItem.description);
      setPrice(props.editItem.price);
    } else {
      reset();
    }
  }, [props.editItem])

  const reset = () => {
    setName('');
    setValidity('');
    setDuration('');
    setDescription('');
    setPrice('');
    props.setEditItem();
  }

  const submit = () => {
    setIsLoading(true);
    // fetch(endpoints.insert()[1], {
    //   method: endpoints.insert()[0],
    //   body: JSON.stringify({ name, validity, duration, price, description })
    // }).then(function (response) {
    //   return response.json();
    // }).then(function (data) {
    //   // ChromeSamples.log('Created Gist:', data.html_url);
    // });
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
    setIsLoading(true);
    Api({
      endpoint: endpoints.update(props.editItem.id),
      data: { name, validity, duration, price, description },
      onSuccess: (response) => {
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
        <Button onClick={isEditing ? update : submit} type="danger" shape="round" icon={<SaveOutlined />} size={10}>
          {isEditing ? 'Update' : 'Insert'}
        </Button>
      </div>
    </Space>
  );
}

export default Form;
