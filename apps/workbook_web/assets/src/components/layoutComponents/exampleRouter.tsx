import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  RouteComponentProps
} from "react-router-dom";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

const Login: React.FC<RouteComponentProps> = props => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const login = () => {
    setRedirectToReferrer(true);
  };

  const from = props.location.state || { from: { pathname: "/" } };

  if (redirectToReferrer === true) {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <p>You must log in to view the page</p>
      <button onClick={login}>Log in</button>
    </div>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const AuthButton = withRouter(({ history }) =>
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
);

export default function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/public" component={Public} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </Router>
  );
}
