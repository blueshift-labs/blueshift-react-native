import React from 'react';

import BlueshiftSwipeableViewContainer from './BlueshiftSwipeableViewContainer';

const BlueshiftInboxListItem = ({
  inboxMessage,
  onTap,
  onRemove,
  customView,
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
      onDelete={() => handleRemove(inboxMessage)}>
      {customView}
    </BlueshiftSwipeableViewContainer>
  );
};

export default BlueshiftInboxListItem;
