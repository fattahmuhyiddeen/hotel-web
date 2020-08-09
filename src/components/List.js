import React, { useState, useEffect } from 'react';
import { Card, Typography } from 'antd';
import { LoadingOutlined, DeleteOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import Api from '../api';
import { endpoints } from '../endpoints';

const { Text } = Typography;
function List(props) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = () => {
    props.setEditItem();
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
  const remove = (id) => {
    setIsLoading(true);
    Api({
      endpoint: endpoints.delete(id),
      onSuccess: (response) => {
        refresh();
      },
      onFail: () => setIsLoading(false)
    })
  }

  useEffect(() => { refresh() }, []);

  return (
    <>
      <div className="flex-end">
        {isLoading ? <LoadingOutlined /> : <ReloadOutlined onClick={refresh} />}
      </div>
      <InfiniteScroll
        loadMore={() => null}
        hasMore={false}
        loader={<LoadingOutlined />}
      >
        {list.map(data => {
          const isEditing = props.editItem?.id == data.id;
          return (
            <Card
              key={data.id}
              style={{ marginTop: 16, backgroundColor: isEditing ? '#eee' : 'white' }}
              type="inner"
              title={data.name}
              extra={
                isLoading ?
                  <LoadingOutlined />
                  :
                  <>
                    {!isEditing && <EditOutlined onClick={() => props.setEditItem(data)} style={{ color: 'blue', fontSize: '1.2em', padding: '.2em' }} />}
                    <DeleteOutlined onClick={() => remove(data.id)} style={{ color: 'red', fontSize: '1.2em', padding: '.2em' }} />
                  </>
              }
            >
              <div><Text type="secondary">Description:</Text> {data.description}</div>
              <div><Text type="secondary">Duration:</Text> {data.duration}</div>
              <div><Text type="secondary">Price:</Text> {data.price}</div>
              <div><Text type="secondary">Validity:</Text> {data.validity}</div>
              <div><Text type="secondary">Created At:</Text> {moment(data.created_at).format('DD-MMM-YYYY h:mm:ss a')}</div>
            </Card>)
        })}
      </InfiniteScroll>
    </>
  );
}

export default List;
