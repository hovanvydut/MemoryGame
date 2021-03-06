import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { signUpRequest } from './../../actions/signUp';
import './SignUp.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
  }

  onFinish = (values) => {
    const { signUpRequestDispatch } = this.props;
    signUpRequestDispatch(values.username, values.password);
  };

  componentDidUpdate() {
    const { successReq, errorReq } = this.props;

    if (successReq) {
      setTimeout(() => {
        notification.success({ message: successReq.message });
      }, 2000);
      return this.setState({ redirect: { to: '/signin' } });
      // return setTimeout(() => {
      //   this.setState({ redirect: { to: '/signin' } });
      // }, 2000);
    }

    if (errorReq) {
      notification.error({ message: errorReq.message });
    }
  }

  render() {
    const { redirect } = this.state;

    if (redirect && redirect.to) {
      return <Redirect to={redirect.to}></Redirect>;
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
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                SignUp
              </Button>
              Or <Link to="/signin">Sign In now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapSatateToProps = (state) => {
  return {
    successReq: state.signup.successReq,
    errorReq: state.signup.errorReq,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpRequestDispatch: (username, password) =>
      dispatch(signUpRequest(username, password)),
  };
};

export default connect(mapSatateToProps, mapDispatchToProps)(SignUp);
