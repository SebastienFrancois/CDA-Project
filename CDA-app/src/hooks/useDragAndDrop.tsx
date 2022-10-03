import { useState } from 'react';
import { TASKS } from '../api/query';
import { useMutation } from '@apollo/client';

export const useDragAndDrop = (initialState: ITask[] = []) => {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<ITask[]>(initialState);

  const [updateTask] = useMutation(TASKS.update);

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  const handleUpdateList = (id: string, status: TaskStatus) => {
    const card = listItems.find((item) => item._id === id);

    if (card && card.status !== status) {
      card.status = status;
      updateTask({
        variables: { updateTaskId: card._id, status: card.status },
        refetchQueries: 'active',
      });
      // We call the setListItems to update the status, placing:
      // The card with its updated status property.
      // A new array, filtering the items to remove the card we are updating and avoid duplicating the information.
      setListItems((prev) => [card, ...prev.filter((item) => item._id !== id)]);
    }
  };

  return {
    isDragging,
    listItems,
    handleUpdateList,
    handleDragging,
  };
};
