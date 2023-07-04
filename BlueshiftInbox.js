import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Platform,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Blueshift from "./index";

export const BlueshiftInbox = (
  pullToRefreshColor,
  loaderColor,
  customStyle,
  placeholderText,
  dateFormatter
) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onLoadComplete, setOnLoadComplete] = useState(false);

  const inappLoadEvent = "InAppLoadEvent";
  const inboxDataChangeEvent = "InboxDataChangeEvent";
  const styles = customStyle ?? defaultStyle;
  var cachedInAppScreenName = null;

  const handlePullToRefresh = () => {
    if (isRefreshing == false) {
      setIsRefreshing(true);
    }
    Blueshift.syncInboxMessages((res) => {
      setIsRefreshing(false);
    });
  };

  const setupListeners = () => {
    Blueshift.addEventListener(inboxDataChangeEvent, (event) => {
      loadMessages();
    });

    Blueshift.addEventListener(inappLoadEvent, (event) => {
      setIsLoading(false);
    });
  };

  const handleDeleteItem = (item) => {
    console.log("Deleted item:", item);
  };

  const loadMessages = () => {
    Blueshift.getInboxMessages((res) => {
      setMessages(res.messages);
      console.log(res);
    });
  };

  const showInboxMessage = (item) => {
    setIsLoading(true);
    Blueshift.showInboxMessage(item);
  };

  useEffect(() => {
    console.log("useEffect");
    setupListeners();
    loadMessages();
    if (onLoadComplete == false) {
      Blueshift.syncInboxMessages((data) => {});
      setOnLoadComplete(true);
    }
    handleInitState();

    return () => {
      console.log("unload useEffect");
      Blueshift.removeEventListener(inboxDataChangeEvent);
      Blueshift.removeEventListener(inappLoadEvent);
      handleDispose();
    };
  }, []);

  const handleInitState = () => {
    Blueshift.getRegisteredForInAppScreenName((screenName) => {
      if (Platform.OS == "ios") {
        handleIOSInAppRegistrationInit(screenName);
      } else if (Platform.OS == "android") {
        handleAndroidInAppRegistrationInit(screenName);
      }
    });
  };

  const handleDispose = () => {
    if (Platform.OS == "ios") {
      handleIOSInAppRegistrationCleanup();
    } else if (Platform.OS == "android") {
      handleAndroidInAppRegistrationCleanup();
    }
  };

  const handleIOSInAppRegistrationInit = (screenName) => {
    if (screenName != null && screenName != "") {
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

  const handleAndroidInAppRegistrationInit = (screenName) => {
    cachedInAppScreenName = screenName;
    Blueshift.registerForInAppMessage("blueshift_inbox");
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

  const renderListItem = ({ item }) => {
    const createdAt = new Date(item.createdAt * 1000);
    const createdAtString = dateFormatter
      ? dateFormatter(createdAt)
      : createdAt.toDateString();
    return (
      <TouchableOpacity
        onPress={() => showInboxMessage(item)}
        style={styles.listItemContainer}
      >
        <View style={styles.listItem}>
          <View
            style={
              item.status == "read" ? styles.empty_circle : styles.filled_circle
            }
          />
          <View style={styles.textContainer}>
            {item.title && <Text style={styles.title}>{item.title}</Text>}
            {item.details && (
              <Text style={styles.subtitle}>{item.details}</Text>
            )}
            {item.createdAt && (
              <Text style={styles.date}>{createdAtString}</Text>
            )}
          </View>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderPlaceholderText = () => (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>{placeholderText}</Text>
    </View>
  );

  const renderLoader = () => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={loaderColor ?? "#00c0c0"} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? renderLoader() : null}
      <FlatList
        data={messages}
        renderItem={renderListItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={renderPlaceholderText}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handlePullToRefresh}
            tintColor={pullToRefreshColor ?? "#00c0c0"}
          />
        }
      />
    </View>
  );
};

const defaultStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 14,
    color: "#808080",
  },
  date: {
    fontSize: 12,
    fontWeight: "300",
    color: "#808080",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: "cover",
  },
  filled_circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    marginRight: 10,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  empty_circle: {
    width: 10,
    height: 10,
    marginRight: 10,
    marginTop: 5,
    alignSelf: "flex-start",
  },
  placeholderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "gray",
  },
});
