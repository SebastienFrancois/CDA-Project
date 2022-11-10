import React, { FC, useState, useContext } from 'react';

import { COMMENTS } from './../../api/query';
import { useQuery, useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { AuthContext } from '../../contexts/AuthContext';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid';

import './TaskCardChat.scss';

interface TaskCardChatProps {
  taskId: string;
}

const TaskCardChat: FC<TaskCardChatProps> = ({ taskId }) => {
  const { currentUser } = useContext(AuthContext);

  const [gError, setgError] = useState<string>('');
  const { data: comments } = useQuery(COMMENTS.get, { variables: { taskId } });
  const [addComment] = useMutation(COMMENTS.add);
  const [deleteComment] = useMutation(COMMENTS.delete);
  const [updateComment] = useMutation(COMMENTS.update);
  const [newComment, setNewComment] = useState('');
  const [updatedCommentId, setUpdatedCommentId] = useState('');
  const [isUpdatingComment, setIsUpdatingComment] = useState(false);

  const handleClick = async () => {
    try {
      await addComment({
        variables: { message: newComment, task: taskId },
        refetchQueries: 'active',
      });
      setNewComment('');
    } catch (err: any) {
      setgError(err.message);
    }
  };
  const onUpdate = async () => {
    try {
      await updateComment({
        variables: { message: newComment, updateCommentId: updatedCommentId },
        refetchQueries: 'active',
      });
      setNewComment('');
    } catch (err: any) {
      setgError(err.message);
    }
  };

  const onDelete = async (commentId: string) => {
    try {
      await deleteComment({
        variables: { deleteCommentId: commentId },
        refetchQueries: 'active',
      });
    } catch (err: any) {
      setgError(err.message);
    }
  };

  return (
    <div className="TaskCardChat mt-8">
      <div className="commentBox overflow-y-scroll flex flex-col gap-4">
        {comments &&
          comments.getComments.map(
            ({ sentBy: { username, role, _id: userId }, _id, message, sentAt }): any => (
              <div
                className={`flex flex-col w-3/4 ${currentUser?.id == userId ? 'self-end' : ''}`}
                key={_id}
              >
                <div
                  className={`${currentUser?.id == userId ? 'comment-user' : 'comment-not-user'}`}
                >
                  <div className="comment-user-title mb-2 flex items-center justify-between">
                    <p className="capitalize">
                      {username} - {role}
                    </p>
                    {(currentUser?.role == 'ADMIN' || currentUser?.id == userId) && (
                      <div className="flex gap-2">
                        <PencilIcon
                          className="w-4 h-auto opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer inline-block"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsUpdatingComment(true);
                            setUpdatedCommentId(_id);
                            setNewComment(message);
                          }}
                        />
                        <TrashIcon
                          className="w-4 h-auto opacity-60 hover:opacity-100 transition-all ease-in-out cursor-pointer inline-block"
                          onClick={() => onDelete(_id)}
                        />
                      </div>
                    )}
                  </div>
                  <p>{message}</p>
                </div>
                <p className="self-end">
                  le {dayjs(Number(sentAt)).format('DD/MM/YYYY')} à&nbsp;
                  {dayjs(Number(sentAt)).format('HH:mm')}
                </p>
              </div>
            ),
          )}

        {comments && !comments.getComments.length && (
          <div className="flex flex-col w-3/4">
            <div className="comment-not-user">
              <p>Pas de commentaire.</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex mt-8 gap-4 items-center">
        {gError && <span className="w-full text-left text-red-600 my-2 ">{gError}</span>}
        <textarea
          className="commentInput basis-3/4 px-4 py-2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        ></textarea>
        {!isUpdatingComment ? (
          <button className="basis-1/4 chatButton" onClick={handleClick}>
            New comment
          </button>
        ) : (
          <button className="basis-1/4 chatButton" onClick={onUpdate}>
            Update comment
          </button>
        )}

        {isUpdatingComment && (
          <button
            className="basis-1/4 chatButton"
            onClick={() => {
              setNewComment('');
              setIsUpdatingComment(false);
            }}
          >
            Cancel Update
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCardChat;
