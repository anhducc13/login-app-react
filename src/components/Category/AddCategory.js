import React, { useState } from 'react';
import { Form, Input, Typography, Button, Alert } from 'antd';
import { categoryServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const { Title } = Typography;


const AddCategory = (props) => {
  const { history } = props;
  const formItemLayout = {
    labelCol: {
      sm: { span: 24 },
      md: { span: 6 },
    },
    wrapperCol: {
      sm: { span: 24 },
      md: { span: 18 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 24,
        offset: 0,
      },
      md: {
        span: 18,
        offset: 6,
      },
    },
  };


  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("")
  const [description, setDescription] = useState("");
  const [errorText, setErrorText] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setErrorName("Please enter category name");
      return;
    }
    setLoading(true);
    const params = {
      "name": name,
      "description": description,
    }
    categoryServices.addCategory(params)
      .then(() => {
        setLoading(false);
        openNotificationWithIcon('success', 'Success', 'Add category success');
        props.history.push('/list-category');
      })
      .catch((err) => {
        setLoading(false);
        if (err && err.response) {
          const { status, data } = err.response;
          if (status === 400) {
            setErrorText(data.message)
            return;
          }
          if (status === 401) {
            openNotificationWithIcon('error', 'Error', 'Expired session. Please login to continue');
            history.push('/login');
            return;
          }
          if (status === 404) {
            history.push('/404');
            return;
          }
          if (status > 400 && status < 500) {
            openNotificationWithIcon('error', 'Error', data.message)
            history.push('/403');
            return;
          }
        }
        history.push('/500');
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
        Add new category
      </Title>
      <Form {...formItemLayout}>
        <Form.Item label="Category name" help={errorName} validateStatus={errorName && "error"}>
          <Input name="name" onChange={e => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Description">
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onInit={editor => {
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => setDescription(editor.getData())}
            config={{
              toolbar: [ 'heading', '|', 'bold', 'italic', 'bulletedList',
              'numberedList', 'blockQuote', '|', 'undo', 'redo', ]
            }}
          />
        </Form.Item>
        {errorText && (
          <Form.Item {...tailFormItemLayout}>
            <Alert
              message={errorText}
              type="error"
              closable
              showIcon
            />
          </Form.Item>
        )}
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            icon="save"
            loading={loading}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddCategory;


