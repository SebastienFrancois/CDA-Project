import { useState } from 'react';

export const useDragAndDrop = (initialState: ITask[] = []) => {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<ITask[]>(initialState);

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  const handleUpdateList = (id: string, status: TaskStatus) => {
    const card = listItems.find((item) => item._id === id);

    if (card && card.status !== status) {
      card.status = status;

      // We call the setListItems to update the status, placing:
      // The card with its updated status property.
      // A new array, filtering the items to remove the card we are updating and avoid duplicating the information.
      setListItems((prev) => [card!, ...prev.filter((item) => item._id !== id)]);
    }
  };

  return {
    isDragging,
    listItems,
    handleUpdateList,
    handleDragging,
  };
};
