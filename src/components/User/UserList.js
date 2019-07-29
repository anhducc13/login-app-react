import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Icon, Row, Col, Typography, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { userServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import { UserContext } from 'UserContext';
import { cookiesHelpers } from 'helpers';

const { Title } = Typography;
const { confirm } = Modal;



const UserList = (props) => {

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const fetchUser = (args = {}) => {
    setLoading(true);
    userServices.fetchUsers(args)
      .then(res => {
        const pager = Object.assign(pagination);
        pager.total = res.total;
        setLoading(false);
        setData(res.results);
        setPagination(pager)
      })
      .catch((err) => {
        setLoading(false);
        openNotificationWithIcon('error', 'Error', err.response.data.message);
        props.history.push('/home');
      })
  };

  const handleDeleteUser = (id) => {
    confirm({
      title: 'Do you Want Delete User?',
      content: 'Click Cancel to back',
      onOk() {
        userServices.deleteUser(id)
          .then(() => {
            if (user.id === id) {
              setUser(null);
              cookiesHelpers.deleteByName('access_token_cookie')
              props.history.push('/login')
            } else {
              openNotificationWithIcon('success', 'Success', 'Deleted User');
              fetchUser()
            }
          })
          .catch((err) => {
            openNotificationWithIcon('error', 'Error', err.response.message);
          })
      }
    })
  }

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
      render: (record) => {

        return (
          <>
            <Link to={`/user/${record.id}`}><Icon type="folder-open" style={{ marginLeft: 6, fontSize: 20 }} /></Link>
            <Link to="/"><Icon type="edit" style={{ color: "#89CC6F", marginLeft: 6, fontSize: 20 }} /></Link>
            <Icon
              type="delete"
              style={{ color: "#F70F1E", marginLeft: 6, fontSize: 20, cursor: "pointer" }}
              onClick={() => handleDeleteUser(record.id)}
            />
          </>
        )
      },
    },
  ];

  useEffect(() => {
    fetchUser();
    return () => { }
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
            List User
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
  )
}

export default UserList;