import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsersEditing } from '../redux/noslice';
import socket from '../utils/socket';
import { RootState } from '../redux/store';

interface RealTimeUsersProps {
  noteId: string;
  currentUser: string;
}

const RealTimeUsers: React.FC<RealTimeUsersProps> = ({ noteId, currentUser }) => {
  const usersEditing = useSelector((state: RootState) => state.note.usersEditing);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit('startEditing', { noteId, user: currentUser });

    socket.on('usersEditing', (users: string[]) => {
      dispatch(setUsersEditing(users));
    });

    return () => {
      socket.emit('stopEditing', { noteId, user: currentUser });
    };
  }, [dispatch, noteId, currentUser]);

  return (
    <div className="mt-4">
      <h5 className="font-bold text-xl mb-2">Currently Editing:</h5>
      <ul className="list-group">
        {usersEditing.map((user) => (
          <li key={user} className="list-group-item">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeUsers;
