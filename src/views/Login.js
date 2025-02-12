import React, { useState } from "react";
import styled from "styled-components";
import {
  StyledButton, StyledForm, StyledInput
} from "../styled";
import { Form, Icon } from "antd";
import {
  signIn, GOOGLE_PROVIDER, FACEBOOK_PROVIDER, TWITTER_PROVIDER, EMAIL_PROVIDER
} from "../actions";
import { useStateValue } from "../hooks/useStateValue";

const StyledLogin = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;

`;

const Inline = styled.div`
display: flex;
`;

const Login = () => {
  
  const [ state, dispatch ] = useStateValue();
  const [ email, setEmail ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  
  return ( <StyledLogin>
    <h1>Login with</h1>
    <Inline>
      <StyledButton type={ "primary" }
                    style={ { margin: " 0 2rem 1rem 0" } }
                    onClick={ () => signIn( GOOGLE_PROVIDER,
                      dispatch
                    ) }> Google </StyledButton>
      <StyledButton type={ "primary" }
                    style={ { margin: " 0 2rem 1rem 0" } }
                    onClick={ () => signIn( FACEBOOK_PROVIDER,
                      dispatch
                    ) }>Facebook</StyledButton>
      <StyledButton type={ "primary" } onClick={ () => signIn( TWITTER_PROVIDER,
        dispatch
      ) }>Twitter</StyledButton>
    </Inline>
    <StyledForm
      onSubmit={ () => signIn( EMAIL_PROVIDER, dispatch, email, password ) }>
      <StyledInput
        values={ { email } }
        name={ "Email" }
        onChange={ setEmail }
        prefix={ <Icon type="user"
                       style={ { color: "rgba(0,0,0,.25)" } }/> }
        placeholder="Email"
      />
      <Form.Item>
        <StyledInput
          values={ { password } }
          name={ "Password" }
          onChange={ setPassword }
          prefix={ <Icon type="lock"
                         style={ { color: "rgba(0,0,0,.25)" } }/> }
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <StyledButton type="primary" htmlType="submit">
          Sign in
        </StyledButton>
      </Form.Item>
    </StyledForm>
  </StyledLogin> );
};

export default Login;