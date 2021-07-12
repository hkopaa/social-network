import s from './MyPosts.module.css';
import Post from './Post/Post';
import * as React from "react";
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';



const MyPosts = React.memo(props => {

    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

    let newPostElement = React.createRef();

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>

            <div>
                <h3>My posts</h3>
                <AddNewPostForm onSubmit={onAddPost} />
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const maxLength10 = maxLengthCreator(10)

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component={Textarea} validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add</button>
            </div>
        </form>
    )
}


AddNewPostForm = reduxForm({ form: 'ProfileAddNewPostForm' })(AddNewPostForm)

export default MyPosts;