import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { useLazyQuery } from "@apollo/react-hooks";
import { TokenData } from "../../types";
import { loginQuery } from "../../gqlAuth";
import { Input } from ".";

interface LogInFormProps {}
interface UserLogin {
  username: string;
  password: string;
}
const InnerForm = (props: FormikProps<UserLogin>) => {
  const [logIn] = useLazyQuery<TokenData>(loginQuery, {
    variables: {
      username: props.values.username,
      password: props.values.password
    },
    onCompleted: data => {
      localStorage.setItem("workbook-token", data.login.token);
      window.location.reload(true);
    },
    onError: error => {
      alert(`Login failed: error ${JSON.stringify(error, null, 2)}`);
      window.location.reload(true);
    }
  });

  const handleLogin = () => {
    logIn();
  };
  return (
    <Form className="flex items-center justify-center">
      <Input
        fieldName="username"
        placeholder="username"
        labelClassName="text-sm text-gray-600"
      />
      <Input
        password
        fieldName="password"
        placeholder="password"
        labelClassName="text-sm text-gray-600"
      />
      <div>
        <button
          className="bg-gray-100 mx-5 p-2 text-gray-600"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>
    </Form>
  );
};

export const LogInForm = withFormik<LogInFormProps, UserLogin>({
  enableReinitialize: true,
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please type your username"),
    password: Yup.string().required("Please provide your password.")
  }),
  handleSubmit: () => {
    null;
  }
})(InnerForm);
