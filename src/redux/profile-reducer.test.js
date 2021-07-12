import profileReducer, { addPostActionCreator, deletePost } from './profile-reducer';


let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 23 }
    ]
}

test('length of posts should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator('it-incubator.by')

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectations
    expect(newState.posts.length).toBe(3)
})

test('message of new post should be correct', () => {
    // 1. test data
    let action = addPostActionCreator('it-incubator.by')

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectations
    expect(newState.posts[2].message).toBe('it-incubator.by')
})

test('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(1)

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectations
    expect(newState.posts.length).toBe(1)
})