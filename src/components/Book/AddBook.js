import React, { useState, useEffect } from 'react';
import { Form, Input, Typography, Button, Alert, InputNumber, Select, Checkbox } from 'antd';
import { bookServices, imgurServices } from 'services';
import openNotificationWithIcon from 'helpers/notification';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const { Title } = Typography;
const { Option } = Select;


const AddBook = (props) => {
  const { history } = props;
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const tailFormItemLayout = {
    wrapperCol: { span: 24 },
  };


  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([])
  const [book, setBook] = useState(
    {
      name: "",
      description: "",
      author: "",
      is_active: true,
      price: null,
      quantity_in_stock: null,
      categories: [],
    }
  )
  const [errorText, setErrorText] = useState("");
  const editorState = EditorState.createEmpty();

  useEffect(() => {
    bookServices.getAllCategory()
      .then(cats => setCategories(cats))
      .catch(err => {
        if (err && err.response) {
          openNotificationWithIcon('error', 'Error', err.response.data.message);
          props.history.push('/home');
          return;
        }
        props.history.push('/500');
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateFields = () => {
    const {
      name,
      quantity_in_stock,
      price,
    } = book;
    if (name.trim() === "")
      return "Please enter book name";
    if (!Number.isInteger(quantity_in_stock))
      return "Please enter quantity in stock";
    if (!Number.isFinite(price))
      return "Please enter price";
    return "";
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateFields();
    setErrorText(err);
    if (err !== "")
      return;
    setLoading(true);
    bookServices.addBook(JSON.stringify(book))
    .then(() => {
      setLoading(false);
      openNotificationWithIcon('success', 'Success', 'Add book success');
      props.history.push('/list-book');
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

  const uploadImageDraftjs = (file) => {
    return imgurServices.uploadImage(file)
      .then(linkImg => {
        return {
          data: {
            link: linkImg
          }
        }
      })
      .catch(() => {})
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
        Add new book
      </Title>
      <Form {...formItemLayout}>
        <Form.Item label="Book name">
          <Input
            name="name"
            value={book.name}
            onChange={e => setBook({...book, name: e.target.value})} 
          />
        </Form.Item>
        <Form.Item label="Description">
          <Editor
            initialEditorState={editorState}
            toolbarStyle={{
              border: '1px solid #D9D9D9',
            }}
            editorStyle={{
              border: '1px solid #D9D9D9',
              padding: '0 10px',
            }}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { uploadCallback: uploadImageDraftjs, alt: { present: true, mandatory: true } },
            }}
            onEditorStateChange={(eState) => setBook({
              ...book,
              description: draftToHtml(convertToRaw(eState.getCurrentContent()))
            })}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={book.is_active}
            onChange={e => setBook({...book, is_active: e.target.checked})}
          >
            Active
          </Checkbox>
        </Form.Item>
        <Form.Item label="Author">
          <Input
            name="author"
            value={book.author}
            onChange={e => setBook({...book, author: e.target.value})} 
          />
        </Form.Item>
        <Form.Item label="Quantity in stock">
          <InputNumber
            name="quantity_in_stock"
            min={0}
            style={{ width: '100%' }}
            value={book.quantity_in_stock}
            onChange={val => setBook({...book, quantity_in_stock: val})}
          />
        </Form.Item>
        <Form.Item label="Price (VNĐ)">
          <InputNumber
            name="price"
            min={0}
            style={{ width: '100%' }}
            value={book.price}
            onChange={val => setBook({...book, price: val})}
          />
        </Form.Item>
        <Form.Item label="Categories">
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select category"
            value={book.categories}
            onChange={value => setBook({ ...book, categories: value })}
          >
            {categories.map(val => (
              <Option key={val.id} value={val.id}>
                {val.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Images">
          {/* <BookImages bookImages={[]} {...props} /> */}
        </Form.Item>
        {errorText && (
          <Form.Item {...tailFormItemLayout}>
            <Alert
              message={errorText}
              type="error"
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

export default AddBook;


