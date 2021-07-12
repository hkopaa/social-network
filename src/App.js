import styles from './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

/* import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from "./components/Dialogs/DialogsContainer"; */



class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className={styles.appWrapper} >
                <HeaderContainer />
                <Navbar />
                <div className={styles.appWrapperContent}>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
                        <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
                        <Route path='/users' render={() => <UsersContainer />} />
                        <Route path='/login' render={() => <Login />} />
                        <Route path='*' render={() => <div>404 NOT FOUND</div>} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp }))(App);