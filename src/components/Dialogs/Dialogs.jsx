import React from 'react'
import s from './Dialogs.module.css'
import { Redirect } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />)
    let newMessageBody = state.newMessageBody;

    if (!props.isAuth) return <Redirect to={'/login'} />

    const addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }


    return (
        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageReduxForm onSubmit={addNewMessage} />
            </div>

        </div>
    )
}

const maxLength100 = maxLengthCreator(100);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Enter your message' name='newMessageBody' component={Textarea} validate={[required, maxLength100]} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default Dialogs;