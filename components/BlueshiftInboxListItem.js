import React, { useState, useEffect } from "react";
import {} from "react-native";

import BlueshiftInboxListItemWrapper from "./BlueshiftInboxListItemWrapper";

const BlueshiftInboxListItem = ({
  inboxMessage,
  renderViews,
  onShow,
  onRemove,
}) => {
  const renderedView = renderViews(inboxMessage);

  const handleShow = (message) => {
    onShow(message);
  };
  const handleRemove = (message) => {
    onRemove(message);
  };

  return (
    <BlueshiftInboxListItemWrapper
      onClick={() => handleShow(inboxMessage)}
      onDelete={() => handleRemove(inboxMessage)}
    >
      {renderedView}
    </BlueshiftInboxListItemWrapper>
  );
};

export default BlueshiftInboxListItem;
