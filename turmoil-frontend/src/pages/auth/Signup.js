import React, { Component } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../js/utils/validators';

class Signup extends Component {
  state = {
    signupForm: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      },
      name: {
        value: '',
        valid: false,
        touched: false,
        validators: [required],
      },
      formIsValid: false,
    },
  };

  inputChangeHandler = (input, value) => {
    this.setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.signupForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          valid: isValid,
          value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        signupForm: updatedForm,
        formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => ({
      signupForm: {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          touched: true,
        },
      },
    }));
  };

  render() {
    const { onSignup, loading } = this.props;
    const { signupForm } = this.state;

    return (
      <form onSubmit={(e) => onSignup(e, this.state)}>
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandler.bind(this, 'email')}
          value={signupForm.email.value}
          valid={signupForm.email.valid}
          touched={signupForm.email.touched}
        />
        <Input
          id="name"
          label="Your Name"
          type="text"
          control="input"
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandler.bind(this, 'name')}
          value={signupForm.name.value}
          valid={signupForm.name.valid}
          touched={signupForm.name.touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={this.inputChangeHandler}
          onBlur={this.inputBlurHandler.bind(this, 'password')}
          value={signupForm.password.value}
          valid={signupForm.password.valid}
          touched={signupForm.password.touched}
        />
        <Button design="raised" type="submit" loading={loading}>
          Signup
        </Button>
      </form>
    );
  }
}

export default Signup;
