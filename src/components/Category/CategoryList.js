import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Icon, Row, Col, Typography, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { categoryServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import { UserContext } from 'UserContext';

const { Title } = Typography;
const { confirm } = Modal;



const CategoryList = (props) => {

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [user] = useContext(UserContext);

  const fetchCategories = (args = {}) => {
    setLoading(true);
    categoryServices.fetchCategories(args)
      .then(res => {
        const pager = Object.assign(pagination);
        pager.total = res.total;
        setLoading(false);
        setData(res.results);
        setPagination(pager)
      })
      .catch((err) => {
        setLoading(false);
        if (err && err.response) {
          openNotificationWithIcon('error', 'Error', err.response.data.message);
          props.history.push('/home');
          return;
        }
        props.history.push('/500');
        
      })
  };

  const handleDeleteCategory = (id) => {
    confirm({
      title: 'Do you Want Delete Category?',
      content: 'Click Cancel to back',
      onOk() {
        categoryServices.deleteCategory(id)
          .then(() => {
            openNotificationWithIcon('success', 'Success', 'Deleted Category');
            fetchCategories()
          })
          .catch((err) => {
            if (err && err.response) {
              openNotificationWithIcon('error', 'Error', err.response.data.message);
              props.history.push('/home');
              return;
            }
            props.history.push('/500');
          })
      }
    })
  }

  //   const editUser = (id, params) => {
  //     const formData = new FormData();
  //     Object.keys(params).forEach(key => formData.append(key, params[key]));

  //     userServices.editUser(id, formData)
  //       .then(() => {
  //         openNotificationWithIcon('success', 'Success', 'Update success');
  //         fetchUser()
  //       })
  //       .catch((err) => {
  //         openNotificationWithIcon('error', 'Error', err.response.message);
  //       })
  //   }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      sorter: true,
    },
    {
      title: 'Last Updated',
      dataIndex: 'updated_at',
    },
    {
      title: 'User created',
      dataIndex: 'user_created',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      render: (isActive) => {
        return isActive ? (
          <Button
            type="primary"
            size="small"
          >
            Active
          </Button>
        ) : (
          <Button
            type="danger"
            size="small"
          >
            Inctive
          </Button>
          )
      },
      filters: [{ text: 'Active', value: true }, { text: 'Inactive', value: false }],
    },
    {
      title: 'Action',
      render: (record) => {

        return (
          <>
            <Link to={`/category/edit/${record.id}`}>
              <Icon type="edit" style={{ marginLeft: 6, fontSize: 20 }} />
            </Link>
            <Icon
              type="delete"
              style={{ color: "#F70F1E", marginLeft: 6, fontSize: 20, cursor: "pointer" }}
              onClick={() => handleDeleteCategory(record.id)}
            />

          </>
        )
      },
    },
  ];

  useEffect(() => {
    fetchCategories();
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleTableChange = (_pagination, _filters, _sorter) => {
    const pager = { ...pagination };
    pager.current = _pagination.current;
    setPagination(pager)
    fetchCategories({
      _page: _pagination.current,
      _limit: _pagination.pageSize,
      _sort: _sorter.field,
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
      <Row>
        <Col span={12}>
          <Title
            level={2}
          >
            List Category
          </Title>
        </Col>
        <Col span={12}>
          <Link to="/category/add" style={{ paddingTop: 5, float: "right" }}>
            <Button type="primary" icon="plus-square">
              Add Category
            </Button>
          </Link>
        </Col>
      </Row>

      {user && (
        <Table
          size="small"
          rowKey={record => record.id}
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ x: 1000 }}
        />
      )}
    </div>
  )
}

export default CategoryList;