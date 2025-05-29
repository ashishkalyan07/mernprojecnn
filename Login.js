import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../network/instance';
import EndPoints from '../network/endPoints';

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
 
  const loginApiCall = async (values) => {
    const { email, password } = values;
    try {
      await instance({
        url: EndPoints.login,
        method: "POST",
        data: {
          username: email,
          password: password
        }
      }).then((res) => {
        localStorage.setItem("userData", JSON.stringify(res));
        navigate('/app/dashboard');
        console.log("response >>> ", res);
      });
    } catch (e) {
      // handle error
      console.log("ERROR >>> ", e);
      console.error(e);
    }
  }
  const onFinish = async (values) => loginApiCall(values);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <br />
      <br />
      <div className='container rounded border p-20 m-20'>
        <h2 className='text-center text-primary'>Login to Portal</h2>
        <Form
          name='basic'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='remember'
            valuePropName='checked'
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Login
            </Button>
            {loginError && <p className='text-danger'>{loginError}</p>}
            <p className='mt-3'>Create a new account
              <Link to='/register' className='btn btn-primary m-2'>
                Sign up
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
