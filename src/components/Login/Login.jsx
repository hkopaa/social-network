import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input, createField } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux'
import { login, logout } from '../../redux/auth-reducer';
import { Redirect } from 'react-router';
import styles from './../common/FormsControls/FormsControls.module.css'


const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'E-mail'} name={'email'} component={Input} validate={[required]} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input} validate={[required]} type={'password'} />
            </div>
            <div>
                <input component={Input} name={'rememberMe'} type={'checkbox'} /> remember me
            </div>

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField('Symbols from img', 'captcha', [required], Input, {})}

            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }


    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login, logout })(Login);