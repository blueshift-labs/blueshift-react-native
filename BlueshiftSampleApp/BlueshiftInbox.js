import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Blueshift from 'blueshift-react-native';

const BlueshiftInbox = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onLoadComplete, setOnLoadComplete] = useState(false);

  const handlePullToRefresh = () => {
    if (isRefreshing == false) {
      setIsRefreshing(true);
    }
    Blueshift.syncInboxMessages(res => {
      setIsRefreshing(false);
    });
  };

  const setupListeners = () => {
    Blueshift.addEventListener('InboxDataChangeEvent', event => {
      loadMessages();
    });

    Blueshift.addEventListener('InAppLoadEvent', evt => {
      setIsLoading(false);
    });
  };

  const handleDeleteItem = item => {
    // Handle the delete action for the list item
    console.log('Deleted item:', item);
    // const updatedData = listData.filter((dataItem) => dataItem.id !== item.id);
    // setListData(updatedData);
  };

  const loadMessages = () => {
    Blueshift.getInboxMessages(res => {
      setMessages(res.messages);
      console.log(res);
    });
  };

  const showInboxMessage = item => {
    setIsLoading(true);
    Blueshift.showInboxMessage(item);
  };

  useEffect(() => {
    console.log('useEffect');
    setupListeners();
    loadMessages();
    if (onLoadComplete == false) {
      Blueshift.syncInboxMessages(res => {});
      setOnLoadComplete(true);
    }

    return () => {
      console.log('unload useEffect');
      Blueshift.removeEventListener('InboxDataChangeEvent');
      Blueshift.removeEventListener('InAppLoadEvent');
    };
  }, []);

  const renderListItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => showInboxMessage(item)}
        style={styles.listItemContainer}>
        <View style={styles.listItem}>
          <View
            style={
              item.status == 'read' ? styles.empty_circle : styles.filled_circle
            }
          />
          <View style={styles.textContainer}>
            {item.title && <Text style={styles.title}>{item.title}</Text>}
            {item.details && (
              <Text style={styles.subtitle}>{item.details}</Text>
            )}
            {item.createdAt && (
              <Text style={styles.date}>{Date(item.createdAt * 1000)}</Text>
            )}
          </View>
          <Image source={{uri: item.imageUrl}} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderLoader = () => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  };

  const pulllToRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={handlePullToRefresh}
        // style={styles.pullToRefresh}
      />
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? renderLoader() : null}
      <FlatList
        data={messages}
        renderItem={renderListItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handlePullToRefresh}
            tintColor="red"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
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
});

export default BlueshiftInbox;
