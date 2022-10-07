import React, { FC } from 'react';
import './TaskCardChat.scss';

interface TaskCardChatProps {}

const TaskCardChat: FC<TaskCardChatProps> = () => {
  return (
    <div className="TaskCardChat mt-8">
      <div className="commentBox h-3/6 overflow-y-scroll flex flex-col gap-4">
        <div className="flex flex-col w-3/4">
          <div className="comment-not-user">
            <p className="comment-user-title mb-2">Benjamin - CTO</p>
            <p>Arrête de faire de la merde !!! Mauvais stagiaire que tu es...</p>
          </div>
          <p className="self-end">le...à...</p>
        </div>
        <div className="flex flex-col self-end w-3/4">
          <div className="comment-user">
            <p className="comment-user-title mb-2">Romain - Stagiaire Dev</p>
            <p>...je vois pas de quoi tu parles</p>
          </div>
          <p className="self-end">le...à...</p>
        </div>
        <div className="flex flex-col w-3/4">
          <div className="comment-not-user">
            <p className="comment-user-title mb-2">Benjamin - CTO</p>
            <p>Arrête de faire de la merde !!! Mauvais stagiaire que tu es...</p>
          </div>
          <p className="self-end">le...à...</p>
        </div>
      </div>
      <div className="flex mt-8 gap-4 items-center">
        <textarea
          className="commentInput basis-3/4 px-4 py-2"
          placeholder="je poste un commentaire"
        ></textarea>
        <button className="basis-1/4 chatButton" type="submit">
          New comment
        </button>
      </div>
    </div>
  );
};

export default TaskCardChat;
