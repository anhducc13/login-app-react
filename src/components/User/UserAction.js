import React, { useEffect, useState } from 'react';
import { userServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import { Typography, Table } from 'antd';

const { Title } = Typography;


const UserAction = (props) => {
  const { userId } = props

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUserAction = (args = {}) => {
    setLoading(true);
    userServices.fetchUserActions(args)
      .then(res => {
        const pager = Object.assign(pagination);
        pager.total = res.total;
        setPagination(pager)
        setLoading(false);
        setData(res.results);
      })
      .catch((err) => {
        setLoading(false);
        openNotificationWithIcon('error', 'Error', err.response.data.message);
        props.history.push('/home');
      })
  };

  const columns = [
    {
      title: 'Id Activity',
      dataIndex: 'id',
    },
    {
      title: 'Action',
      dataIndex: 'action_name',
      filters: [
        { text: 'CREATED', value: 'CREATED' },
        { text: 'LOGIN', value: 'LOGIN' },
        { text: 'LOGOUT', value: 'LOGOUT' },
        { text: 'FORGOT PASWORD', value: 'FORGOT_PASWORD' },
        { text: 'UPDATE PASWORD', value: 'UPDATE_PASSWORD' },
        { text: 'LOCK', value: 'LOCK' },

      ],
    },
    {
      title: 'Time',
      dataIndex: 'created_at',
      sorter: true,
    },
  ];

  useEffect(() => {
    fetchUserAction({
      user_id: userId,
    });
    return (() => { })
  }, [])

  const handleTableChange = (_pagination, _filters, _sorter) => {
    const pager = Object.assign(_pagination);
    pager.current = _pagination.current;
    setPagination(pager)
    fetchUserAction({
      user_id: userId,
      _page: pager.current,
      _limit: pager.pageSize,
      _order: _sorter.order,
      ..._filters,
    });
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      padding: 8
    }}
    >
      <Title
        level={2}
      >
        Activity User
      </Title>
      <Table
        size="small"
        rowKey={record => record.id}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default UserAction;
