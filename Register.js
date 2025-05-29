import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../network/instance';
import EndPoints from '../network/endPoints';

const Register = () => {
  const navigate = useNavigate();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const RegisterApiCall = async (values) => {
    const { user, password } = values;

    try {
      const response = await instance.post(EndPoints.register, {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password,
      });

      const userData = response.data;
      localStorage.setItem('userData', JSON.stringify(userData));

      message.success('Registration successful!');
      navigate('/login');
    } catch (e) {
      console.error("Registration error:", e);
      message.error(e?.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const onFinish = async (values) => {
    await RegisterApiCall(values);
  };

  return (
    <div className='container rounded border'>
      <h2 className='text-center text-primary'>Register</h2>
      <Form
        {...layout}
        name="register-form"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['user', 'name']}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[{ type: 'email', required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={['user', 'phoneNumber']}
          label="Phone Number"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>

        <div>
          <Link to="/login">
            <button className='btn btn-primary'>Login</button>
            <p>Login if you are already registered.</p>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
