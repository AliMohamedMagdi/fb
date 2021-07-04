import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import firebase from 'firebase';

import { firestore } from '../../utils/firebase';
import { PostAction } from '..';
import { InsertEmoticonOutlinedIcon, PhotoLibraryRoundedIcon, VideocamRoundedIcon } from '../../utils/icons';

import './CreatePost.scss';
import cuid from 'cuid';

interface CreatePostProps {
  photoUrl?: string | null;
  username?: string | null;
}

function CreatePost({ photoUrl, username }: CreatePostProps): React.ReactElement {
  const [input, setInput] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const id: string = cuid();
    await firestore.collection('posts').doc(id).set({
      profilePic: photoUrl,
      username: username,
      timestamp: new Date(),
      image: imgUrl,
      text: input.trim()
    });

    setInput('');
    setImgUrl('');
  };

  return (
    <div className='createPost'>
      <div className='top'>
        <Avatar src={photoUrl} />
        <form className='form'>
          <input
            className='textInput'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`What's on your mind, ${username}?`}
          />
          <input
            className='imgUrlInput'
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
            placeholder='Image URL (optional)'
          />
          <button onClick={handleSubmit} type='submit'>
            Hidden Submit
          </button>
        </form>
      </div>
      <div className='bottom'>
        {bottomIcon.map(({ Icon, title, color }, index) => (
          <PostAction key={index} Icon={Icon} title={title} color={color} />
        ))}
      </div>
    </div>
  );
}

export default CreatePost;

const bottomIcon = [
  {
    Icon: VideocamRoundedIcon,
    title: 'Live Video',
    color: 'red'
  },
  {
    Icon: PhotoLibraryRoundedIcon,
    title: 'Photo/Video',
    color: 'green'
  },
  {
    Icon: InsertEmoticonOutlinedIcon,
    title: 'Feeling/Activity',
    color: 'orange'
  }
];
