/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Typography, Button } from 'antd';
import { userServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import UserAction from './UserAction';

const { Title } = Typography;

const UserInfo = (props) => {
  const userId = props.match.params.id;

  const [user, setUser] = useState(null);

  const [openUserAction, setOpenUserAction] = useState(false);

  useEffect(() => {
    userServices.fetchUser(userId)
      .then(res => setUser(res))
      .catch(err => {
        openNotificationWithIcon('error', 'Error', err.response.data.message);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        Infomation:
        {' '}
        {user && user.username}
      </Title>
      <Button type="link" onClick={() => setOpenUserAction(!openUserAction)}>View all activity</Button>
      {openUserAction ? (
        <UserAction userId={user && user.id} {...props} />
      ) : null}
    </div>
  )
}

export default UserInfo;