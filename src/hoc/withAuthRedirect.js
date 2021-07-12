import React from "react";
import { Redirect } from "react-router";
import { connect } from 'react-redux';



let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component) => {

    class RedirectComponet extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'} />

            return <Component {...this.props} />
        }
    }


    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponet);

    return ConnectedAuthRedirectComponent;
}