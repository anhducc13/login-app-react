import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export default function Profile() {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      padding: 16
    }}
    >
      <Title
        level={2}
        style={{
          marginBottom: 20
        }}
      >
        Profile
      </Title>
      <Link to="/profile/edit">
        <Button type="primary" icon="edit" style={{ margin: 5 }}>
          Edit Profile
        </Button>
      </Link>
      <Link to="/profile/update-password">
        <Button type="primary" icon="lock" style={{ margin: 5 }}>
          Change Password
        </Button>
      </Link>
    </div>
  )
}
