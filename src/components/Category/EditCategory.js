/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Form, Input, Typography, Button, Checkbox, Alert } from 'antd';
import { categoryServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CategoryAction from './CategoryAction';


const { Title } = Typography;


const EditCategory = (props) => {
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
  const [category, setCategory] = useState(null);
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("")
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [errorText, setErrorText] = useState("");
  const [openCategoryAction, setOpenCategoryAction] = useState(false);

  const categoryId = props.match.params.id;

  useEffect(() => {
    categoryServices.fetchCategory(categoryId)
      .then(res => {
        setCategory(res);
        setName(res.name);
        setIsActive(res.is_active)
        setDescription(res.description);
      })
      .catch(err => {
        if (err && err.response) {
          const { data } = err.response;
          openNotificationWithIcon('error', 'Error', data.message)
          return;
        }
        props.history.push('/500');
      })
  }, [])


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
      "is_active": isActive
    }
    categoryServices.editCategory(categoryId, params)
      .then(() => {
        setLoading(false);
        openNotificationWithIcon('success', 'Success', "Update category success")
      })
      .catch(err => {
        setLoading(false);
        if (err && err.response) {
          const { response } = err;
          if (response.status === 400) {
            setErrorText(response.data.message)
            return;
          }
          if (response.status === 401) {
            openNotificationWithIcon('error', 'Error', "Expired session. Please login to continue");
            props.history.push('/login');
            return;
          }
          if (response.status > 400 && response.status < 500) {
            props.history.push('/403');
            return;
          }
        }
        props.history.push('/500');
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
        Edit category
      </Title>
      <Button type="link" onClick={() => setOpenCategoryAction(!openCategoryAction)}>View all activity</Button>
      {openCategoryAction ? (
        <CategoryAction categoryId={category && category.id} {...props} />
      ) : null}
      {category && (
        <Form {...formItemLayout}>
          <Form.Item label="User created">
            <Input name="user-created" disabled value={category.user_created} />
          </Form.Item>
          <Form.Item label="Created at">
            <Input name="created-at" disabled value={category.created_at} />
          </Form.Item>
          <Form.Item label="Last updated">
            <Input name="last-updated" disabled value={category.updated_at} />
          </Form.Item>
          <Form.Item label="Category name" help={errorName} validateStatus={errorName && "error"}>
            <Input name="name" value={name} onChange={e => setName(e.target.value)} />
          </Form.Item>
          {description && (
            <Form.Item label="Description">
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onInit={editor => {
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => setDescription(editor.getData())}
                config={{
                  toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList',
                    'numberedList', 'blockQuote', '|', 'undo', 'redo',]
                }}
              />
            </Form.Item>
          )}
          <Form.Item label="Active">
            <Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
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
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default EditCategory;


