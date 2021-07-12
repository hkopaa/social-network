import { connect } from 'react-redux';
import {
    follow,
    unfollow,
    setCurrentPage,
    toggleIsFollowingProgress,
    getUsers
} from '../../redux/users-reducer';
import React from 'react';
import Users from "./Users"
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import {
    getUsersPage,
    getTotalUsersCount,
    getPageSize,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress
} from '../../redux/users-selectors';

class UsersContainer extends React.Component {

    componentDidMount() {
        const { currentPage, pageSize } = this.props
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const { pageSize } = this.props
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <div>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingInProgress={this.props.followingInProgress}

            />
        </div>
    }
}

/* let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
} */

let mapStateToProps = (state) => {
    return {
        users: getUsersPage(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}



export default compose(
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage, toggleIsFollowingProgress, getUsers
    })
)(UsersContainer)
