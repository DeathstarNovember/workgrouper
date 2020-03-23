import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { useLazyQuery } from "@apollo/react-hooks";
import { TokenData } from "../../types";
import { loginQuery } from "../../gqlAuth";
import { Input } from "./inputs";

interface LogInFormProps {}
interface UserLogin {
  username: string;
  password: string;
}
const InnerForm = (props: FormikProps<UserLogin>) => {
  const [logIn] = useLazyQuery<TokenData>(loginQuery, {
    onCompleted: data => {
      localStorage.setItem("workbook-token", data.login.token);
      window.location.reload(false);
    },
    onError: error =>
      alert(`Login failed: error ${JSON.stringify(error, null, 2)}`)
  });

  const handleLogin = () => {
    logIn({
      variables: {
        username: props.values.username,
        password: props.values.password
      }
    });
  };
  return (
    <Form className="flex items-center justify-center">
      <Input
        fieldName="username"
        labelClassName="text-sm text-gray-600"
        placeholder="username"
      />
      <Input
        fieldName="password"
        placeholder="password"
        password
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
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please type your username"),
    password: Yup.string().required("Please provide your password.")
  }),
  handleSubmit: () => {
    null;
  }
})(InnerForm);
