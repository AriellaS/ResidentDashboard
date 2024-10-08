import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ajax from "~/util.js"
import TextInputWithLabel from '~/login/TextInputWithLabel';
import ErrorBox from '~/login/ErrorBox';
import * as S from '~/login/styles';

const Login = ({ setToken }) => {

    const [formState, setFormState] = useState({
        email: "",
        password: ""
    });

    const [errorState, setErrorState] = useState({
        isError: false,
        errorMsg: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
         await ajax.request('post', '/login', {
            email: formState.email,
            password: formState.password
         }).then(res => {
             setErrorState({
                 isError: false,
                 errorMsg: ""
             });
             setToken(res.data.accessToken);
             navigate("/");
         }).catch(err => {
             setErrorState({
                 isError: true,
                 errorMsg: err.response.data
             });
         });
    };

    return (
        <S.Container>
            <ErrorBox isError={errorState.isError} errorMsg={errorState.errorMsg} />
            <S.Header children="Login to your account" />
            <form onSubmit={handleSubmit}>
                <TextInputWithLabel
                    value={formState.email}
                    placeholder="Enter your email"
                    text="Email"
                    onChange={e => {setFormState({ ...formState, email: e.target.value})} }
                />
                <TextInputWithLabel
                    value={formState.password}
                    placeholder="Enter your password"
                    text="Password"
                    onChange={e => {setFormState({ ...formState, password: e.target.value})} }
                    type="password"
                />
                <S.Button
                    value="Log In"
                    type="submit"
                />
            </form>
            <S.StyledLink to={"/signup"} children="Need an acccount?" />
        </S.Container>
    )
}

export default Login;
