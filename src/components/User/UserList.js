import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { userServices } from 'services';

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
          <Link to="/"><Icon type="edit" style={{ color: "#89CC6F", marginLeft: 6, fontSize: 20}} /></Link>
          <Link to="/"><Icon type="delete" style={{ color: "#F70F1E", marginLeft: 6, fontSize: 20}} /></Link>
        </>
      )
    },
  },
];

export default class UserList extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  componentDidMount() {
    this.fetchUser();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetchUser({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  fetchUser = (params = {}) => {
    this.setState({ loading: true });
    userServices.fetchUsers()
      .then(res => {
        const pagination = { ...this.state.pagination };
        pagination.total = res.length;
        this.setState({
          loading: false,
          data: res,
          pagination,
        });
      })
  };

  render() {
    return (
      <Table
        size="small"
        rowKey={record => record.id}
        columns={columns}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}