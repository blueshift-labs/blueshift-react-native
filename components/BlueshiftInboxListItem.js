import React from 'react';

import BlueshiftSwipeableViewContainer from './BlueshiftSwipeableViewContainer';

const BlueshiftInboxListItem = ({
  inboxMessage,
  onTap,
  onRemove,
  customView,
  deleteComponent,
}) => {
  const handleTap = message => {
    onTap(message);
  };

  const handleRemove = message => {
    onRemove(message);
  };

  return (
    <BlueshiftSwipeableViewContainer
      onTap={() => handleTap(inboxMessage)}
      onDelete={() => handleRemove(inboxMessage)}
      deleteComponent={deleteComponent}>
      {customView}
    </BlueshiftSwipeableViewContainer>
  );
};

export default BlueshiftInboxListItem;
