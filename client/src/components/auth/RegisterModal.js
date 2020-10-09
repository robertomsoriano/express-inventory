import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  // Form,
  FormGroup,
  NavLink,
  Alert
} from 'reactstrap';
import { 
  Input,
  Form
} from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      password
    };

    // Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <>
        <NavLink onClick={this.toggle} href='#' className='login-modal'>
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Form.Field
                  control={Input}
                  icon='address card'
                  type='text'
                  name='name'
                  id='name'
                  label='Full name'
                  placeholder='Full name'
                  onChange={this.onChange}
                  required
                />

                <Form.Field
                  control={Input}
                  icon='user'
                  iconPosition='left'
                  label='Email/Username'
                  placeholder='Email/Username'
                  type='email'
                  name='email'
                  id='email'
                  onChange={this.onChange}
                  required
                />
                <Form.Field
                  control={Input}
                  icon='lock'
                  iconPosition='left'
                  label='Password'
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  onChange={this.onChange}
                  required
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
