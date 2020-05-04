import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signInRequest } from './../../actions/signIn';
import './SignIn.css';

class SignIn extends React.Component {
  componentDidUpdate() {
    const { errorReq } = this.props;

    if (errorReq) {
      notification.error({ message: errorReq.message });
    }
  }

  onFinish = (values) => {
    const { postSignInRequest } = this.props;
    postSignInRequest(values.username, values.password);
  };

  render() {
    const { token } = this.props;

    if (token) {
      return <Redirect to="/" />;
    }

    return (
      <Row style={{ width: '100vw', height: '100vh' }} justify="center">
        <Col xl={{ span: 6 }} sm={{ span: 12 }}>
          <Form
            name="normal-login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            style={{ marginTop: '50%', translate: '0 -50%' }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link className="login-form-forgot" to="/forgot-password">
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign In
              </Button>
              Or <Link to="/signup">Register now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorReq: state.signin.errorReq,
    token: state.signin.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postSignInRequest: (username, password) =>
      dispatch(signInRequest(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
