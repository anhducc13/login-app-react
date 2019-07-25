import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Icon, Row, Col, Typography } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { userServices } from 'services';
import { UserContext } from 'UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Title } = Typography;



const UserList = (props) => {

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      render: isActive => {
        return isActive ? (
          <Button type="primary" size="small">Active</Button>
        ) : (
          <Button type="danger" size="small">Inctive</Button>
          )
      },
      filters: [{ text: 'Active', value: true }, { text: 'Inactive', value: false }],
    },
    {
      title: 'Action',
      render: () => {

        return (
          <>
            <Link to="/"><Icon type="folder-open" style={{ marginLeft: 6, fontSize: 20 }} /></Link>
            <Link to="/"><Icon type="edit" style={{ color: "#89CC6F", marginLeft: 6, fontSize: 20 }} /></Link>
            <Icon
              type="delete"
              style={{ color: "#F70F1E", marginLeft: 6, fontSize: 20, cursor: "pointer" }}
            />
          </>
        )
      },
    },
  ];

  const fetchUser = (args = {}) => {
    setLoading(true);
    userServices.fetchUsers(args)
      .then(res => {
        console.log(res)
        const pager = { ...pagination };
        pager.total = res.data.length;
        setLoading(false);
        setData(res.data);
        setPagination(pager)
      })
      .catch(() => {
        setLoading(false);
        props.history.push('/home');
      })
  };

  useEffect(() => {
    fetchUser();
    return (() => { })
  }, [])


  const handleTableChange = (_pagination, _filters, _sorter) => {
    const pager = { ...pagination };
    pager.current = _pagination.current;
    setPagination(pager)
    fetchUser({
      _page: _pagination.current,
      _limit: _pagination.pageSize,
      _sort: _sorter.field,
      _order: _sorter.order,
      ..._filters,
    });
  };

  return (user && user.is_admin) ? (
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
            Add New User
          </Title>
        </Col>
        <Col span={12}>
          <Link to="/user/add-user" style={{ paddingTop: 5, float: "right" }}>
            <Button type="primary" icon="plus-square">
              Add User
            </Button>
          </Link>
        </Col>
      </Row>

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
  ) : (
    <>
      {toast.error("Sorry. You are not admin")}
      <Redirect to="/home" />
    </>
    )
}

export default UserList;