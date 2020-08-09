import React, { useState, useEffect } from 'react';
import { Card, Typography } from 'antd';
import { LoadingOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import Api from '../api';
import { endpoints } from '../endpoints';

const { Text } = Typography;
function List(props) {
  const [list, setList] = useState([]);

  const refresh = () => {
    props.setEditItem();
    Api({
      endpoint: endpoints.getAll(),
      onSuccess: (response) => {
        setList(response.data);
      },
    })
  }
  const remove = (id) => {
    Api({
      endpoint: endpoints.delete(id),
      onSuccess: (response) => {
        refresh();
      },
    })
  }

  useEffect(() => { refresh() }, []);

  return (
    <InfiniteScroll
      // pageStart={0}
      loadMore={() => null}
      hasMore={false}
      loader={<LoadingOutlined />}
    >
      {list.map(data => {
        const isEditing = props.editItem?.id == data.id;
        return (
          <Card
            key={data.id}
            style={{ marginTop: 16 }}
            type="inner"
            title={data.name}
            extra={<>
              {!isEditing && <EditOutlined onClick={() => props.setEditItem(data)} style={{ color: 'blue', fontSize: '1.2em', padding: '.2em' }} />}
              <DeleteOutlined onClick={() => remove(data.id)} style={{ color: 'red', fontSize: '1.2em', padding: '.2em' }} />
            </>}
          >
            <div><Text type="secondary">Description:</Text> {data.description}</div>
            <div><Text type="secondary">Duration:</Text> {data.duration}</div>
            <div><Text type="secondary">Price:</Text> {data.price}</div>
            <div><Text type="secondary">Validity:</Text> {data.validity}</div>
            <div><Text type="secondary">Created At:</Text> {moment(data.created_at).format('DD-MMM-YYYY h:mm:ss a')}</div>
          </Card>)
      })}
    </InfiniteScroll>
  );
}

export default List;
