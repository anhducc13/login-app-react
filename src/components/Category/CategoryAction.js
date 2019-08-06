import React, { useEffect, useState } from 'react';
import { categoryServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import { Table } from 'antd';



const CategoryAction = (props) => {
  const { categoryId } = props;

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCategoryActions = (args = {}) => {
    setLoading(true);
    categoryServices.fetchCategoryActions(args)
      .then(res => {
        const pager = Object.assign(pagination);
        pager.total = res.total;
        setPagination(pager)
        setLoading(false);
        setData(res.results);
      })
      .catch((err) => {
        setLoading(false);
        if (err && err.response) {
          const { data } = err.response;
          openNotificationWithIcon('error', 'Error', data.message)
          return;
        }
        props.history.push('/500');
      })
  };

  const columns = [
    {
      title: 'Id Activity',
      dataIndex: 'id',
    },
    {
      title: 'Action',
      dataIndex: 'log_name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Time',
      dataIndex: 'created_at',
      sorter: true,
    },
  ];

  useEffect(() => {
    fetchCategoryActions({
      category_id: categoryId,
    });
    return (() => { })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTableChange = (_pagination, _filters, _sorter) => {
    const pager = Object.assign(_pagination);
    pager.current = _pagination.current;
    setPagination(pager)
    fetchCategoryActions({
      category_id: categoryId,
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

export default CategoryAction;
