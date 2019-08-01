import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import appFirebase from 'services/firebase';

const { Title } = Typography;

export default function Profile() {

  const uploadFile = (e) => {
    e.preventDefault();
    const file = document.querySelector('#photo').files[0];
    const ref = appFirebase.storage().ref(`/ductt/${file.name}`);
    const uploadTask = ref.put(file)
    uploadTask.on("state_changed",
      snapshot => {
        console.log(snapshot)
      },
      err => {

      },
      (data) => {
        console.log(data)
      })
  }


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
      <form>
        <input id="photo" type="file" />
        <button type="submit" onClick={uploadFile}>upload</button>
      </form>
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
