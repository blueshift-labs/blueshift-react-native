import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Text,
  StyleSheet,
} from 'react-native';
import Blueshift from 'blueshift-react-native';

const BlueshiftInbox = () => {
  const itemTitles = [
    'Go to your settings on your iPhone to find the name of the device',
    'Go to your settings on your iPhone to find the name of the device.',
    'Item 3 Go to your settings on your iPhone to find the name of the device.',
  ];
  const itemSubtitles = [
    'Sometimes this will fail and output a message like this:',
    'Subtitle 2 Sometimes this will fail and output a message like this:',
    ' Sometimes this will fail and output a message like this: Subtitle 3',
  ];
  const itemDates = ['2023-06-01', '2023-06-02', '2023-06-03'];
  const itemImages = [
    'https://picsum.photos/300/300',
    'https://picsum.photos/300/300',
    'https://picsum.photos/300/300',
  ];

  // Create an array of objects, each representing an item
  const data = itemTitles.map((title, index) => {
    return {
      title,
      subtitle: itemSubtitles[index],
      date: itemDates[index],
      image: itemImages[index],
    };
  });

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const showInboxMessage = item => {};

  const handleDeleteItem = item => {
    // Handle the delete action for the list item
    console.log('Deleted item:', item);
    // const updatedData = listData.filter((dataItem) => dataItem.id !== item.id);
    // setListData(updatedData);
  };

  useEffect(() => {
   Blueshift

    return () => {

    };
  }, []);


  const renderListItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => showInboxMessage(item)}
        style={styles.listItemContainer}>
        <View style={styles.listItem}>
          {item.title && <View style={styles.circle} />}
          <View style={styles.textContainer}>
            {item.title && <Text style={styles.title}>{item.title}</Text>}
            {item.subtitle && (
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            )}
            {item.date && <Text style={styles.date}>{item.date}</Text>}
          </View>
          {item.image && (
            <Image source={{uri: item.image}} style={styles.image} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderListItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
  },
  date: {
    fontSize: 12,
    color: '#888888',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
});

export default BlueshiftInbox;
