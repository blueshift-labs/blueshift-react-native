import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableOpacity,
} from "react-native";

const BlueshiftSwipeableViewContainer = ({ children, onTap, onDelete }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [isTouched, setIsTouched] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsTouched(true);
    },
    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: 0 });
    },
    onPanResponderRelease: (event, gesture) => {
      setIsTouched(false);
      if (gesture.dx > 100) {
        // Swipe right action
        Animated.spring(position, {
          toValue: { x: 150, y: 0 },
          useNativeDriver: false,
        }).start(); // Execute callback for swipe right
      } else if (gesture.dx < -100) {
        // Swipe left action
        Animated.spring(position, {
          toValue: { x: -150, y: 0 },
          useNativeDriver: false,
        }).start(); // Execute callback for swipe left
      } else {
        if (Math.abs(gesture.dx) < 5 && Math.abs(gesture.dy) < 5) {
          onTap();
        }

        // No significant swipe, reset position to center
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const animatedStyle = {
    transform: position.getTranslateTransform(),
    backgroundColor: isTouched ? "#e0e0e0" : "#f0f0f0", // Change background color when touched
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <View style={styles.stackContainer}>
      <View style={styles.swipableViewBackground}>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[styles.swipeableView, animatedStyle]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  stackContainer: {
    position: "relative",
    height: 100,
  },
  swipableViewBackground: {
    flexDirection: "row",
    backgroundColor: "red",
    height: "100%",
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  swipeableView: {
    left: 0,
    top: 0,
    justifyContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    marginEnd: 8,
    marginStart: 8,
  },
});

export default BlueshiftSwipeableViewContainer;
