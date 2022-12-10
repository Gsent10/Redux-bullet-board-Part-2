import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from '../features/postSlice';
import { selectAllUsers } from '../features/usersSlice';

const AddPost = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const users = useSelector(selectAllUsers);

    const onTitleChange = (e) => {
        setError('');
        setTitle(e.target.value);
    }

    const onContentChange = (e) => {
        setError('');
        setContent(e.target.value);
    }

    const onAuthorChange = (e) => {
        setError('');
        setUserId(e.target.value);
    }

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                dispatch(addNewPost({ title, body: content, userId })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
            } catch(err) {
                console.error('Failed to save post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        } else {
            setError('All fields required')
        }
    }

    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))

  return (
    <section>
        {error && 
            <p>{error}</p>
        }

        <h2>Add a New Post</h2>
        <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input 
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChange}                
            />

            <label htmlFor="postAuthor">Author:</label>
            <select name="postAuthor" id="postAuthor" value={userId} onChange={onAuthorChange}>
                <option value=""></option>
                {userOptions}
            </select>

            <label htmlFor="postContent">Post Content:</label>
            <input 
                type="text"
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChange}                
            />

            <button 
                type="button" 
                onClick={onSavePostClicked}
            >Save Post</button>
        </form>
    </section>
  )
}

export default AddPost