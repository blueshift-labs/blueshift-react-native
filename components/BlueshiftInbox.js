import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  FlatList,
  RefreshControl,
  Platform,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Blueshift from '../index';
import BlueshiftInboxListItem from './BlueshiftInboxListItem';

const BlueshiftInbox = ({
  pullToRefreshColor = '#00C1C1',
  unreadIndicatorColor = '#00C1C1',
  titleStyle,
  detailsStyle,
  timestampStyle,
  dateFormatterFn = date => date.toLocaleString(),
  sortMessagesFn = (msg1, msg2) => (msg1.createdAt < msg2.createdAt ? 1 : -1),
  listItemComponent,
  listItemSeparatorComponent,
  placeholderComponent,
  loadingIndicatorComponent,
  deleteComponent,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onLoadComplete, setOnLoadComplete] = useState(false);

  const inappLoadEvent = 'InAppLoadEvent';
  const inboxDataChangeEvent = 'InboxDataChangeEvent';
  var cachedInAppScreenName = null;

  const handlePullToRefresh = () => {
    if (isRefreshing == false) {
      setIsRefreshing(true);
    }
    Blueshift.syncInboxMessages(res => {
      setIsRefreshing(false);
    });
  };

  const setupListeners = () => {
    Blueshift.addEventListener(inboxDataChangeEvent, event => {
      loadMessages();
    });

    Blueshift.addEventListener(inappLoadEvent, event => {
      setIsLoading(false);
    });
  };

  const loadMessages = () => {
    Blueshift.getInboxMessages(res => {
      setMessages(Array.from(res.messages).sort(sortMessagesFn));
    });
  };

  const showInboxMessage = item => {
    if (Platform.OS == 'ios') {
      setIsLoading(true);
    }

    Blueshift.showInboxMessage(item);
  };

  const deleteInboxMessage = (item, indexToRemove) => {
    setIsLoading(true);
    Blueshift.deleteInboxMessage(item, (success, errorMessage) => {
      setIsLoading(false);
      if (success) {
        setMessages(oldMessages =>
          oldMessages.filter((_, index) => index != indexToRemove),
        );
      } else {
        console.log(errorMessage);
      }
    });
  };

  useEffect(() => {
    setupListeners();
    loadMessages();
    if (onLoadComplete == false) {
      Blueshift.syncInboxMessages(data => {});
      setOnLoadComplete(true);
    }
    handleInitState();

    return () => {
      Blueshift.removeEventListener(inboxDataChangeEvent);
      Blueshift.removeEventListener(inappLoadEvent);
      handleDispose();
    };
  }, []);

  const handleInitState = () => {
    Blueshift.getRegisteredForInAppScreenName(screenName => {
      if (Platform.OS == 'ios') {
        handleIOSInAppRegistrationInit(screenName);
      } else if (Platform.OS == 'android') {
        handleAndroidInAppRegistrationInit(screenName);
      }
    });
  };

  const handleDispose = () => {
    if (Platform.OS == 'ios') {
      handleIOSInAppRegistrationCleanup();
    } else if (Platform.OS == 'android') {
      handleAndroidInAppRegistrationCleanup();
    }
  };

  const handleIOSInAppRegistrationInit = screenName => {
    if (screenName != null && screenName != '') {
      cachedInAppScreenName = screenName;
      Blueshift.unregisterForInAppMessage();
    }
  };

  const handleIOSInAppRegistrationCleanup = () => {
    if (cachedInAppScreenName != null) {
      Blueshift.registerForInAppMessage(cachedInAppScreenName);
      cachedInAppScreenName = null;
    }
  };

  const handleAndroidInAppRegistrationInit = screenName => {
    cachedInAppScreenName = screenName;
    Blueshift.registerForInAppMessage('blueshift_inbox');
  };

  const handleAndroidInAppRegistrationCleanup = () => {
    Blueshift.unregisterForInAppMessage();

    /// If cachedInAppScreenName is null, the host app may not have
    /// registered any screen for in-app display. Having this check
    /// will prevent doing an unintentional call to registerForInAppMessage().
    if (cachedInAppScreenName != null) {
      Blueshift.registerForInAppMessage(cachedInAppScreenName);
    }
  };

  const defaultListItem = item => {
    const createdAt = new Date(item.createdAt * 1000);
    const createdAtString = dateFormatterFn(createdAt);

    return (
      <View style={styles.listItem}>
        {item.status == 'read' ? (
          <View style={styles.empty_circle} />
        ) : (
          <View
            style={[
              styles.filled_circle,
              { backgroundColor: unreadIndicatorColor },
            ]}
          />
        )}
        <View style={styles.textContainer}>
          {item.title && (
            <Text style={[styles.title, titleStyle]}>{item.title}</Text>
          )}
          {item.details && (
            <Text style={[styles.subtitle, detailsStyle]}>{item.details}</Text>
          )}
          {item.createdAt && (
            <Text style={[styles.date, timestampStyle]}>{createdAtString}</Text>
          )}
        </View>
        {item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        )}
      </View>
    );
  };

  const renderListItem = ({ item, index }) => {
    var listItemView;
    if (listItemComponent) {
      listItemView = listItemComponent(item);
    } else {
      listItemView = defaultListItem(item);
    }

    return (
      <BlueshiftInboxListItem
        customView={listItemView}
        onTap={() => showInboxMessage(item)}
        onRemove={() => deleteInboxMessage(item, index)}
        inboxMessage={item}
        deleteComponent={deleteComponent}
      />
    );
  };

  const defaultLoadingIndicator = (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={'#00C1C1'} />
    </View>
  );

  const renderLoader = () => {
    const loadingIndicator =
      loadingIndicatorComponent ?? defaultLoadingIndicator;
    return loadingIndicator;
  };

  const defaultListItemSeparator = (
    <View style={{ backgroundColor: 'gray', height: 0.5 }} />
  );

  const renderSeparator = () => {
    const separator = listItemSeparatorComponent ?? defaultListItemSeparator;
    return separator;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderListItem}
        ListEmptyComponent={placeholderComponent}
        ItemSeparatorComponent={renderSeparator()}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handlePullToRefresh}
            tintColor={pullToRefreshColor ?? '#00C1C1'}
          />
        }
      />
      {isLoading ? renderLoader() : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loaderContainer: {
    position: 'absolute', // Positions the loader on top of the UI
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    minHeight: 80,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    color: '#808080',
  },
  date: {
    fontSize: 12,
    fontWeight: '300',
    color: '#808080',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  filled_circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  empty_circle: {
    width: 10,
    height: 10,
    marginRight: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default BlueshiftInbox;
