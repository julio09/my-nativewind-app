import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet
} from 'react-native';
import StackNavigation from "./navigation/stackNavigation";
import Toast from "react-native-toast-message";


export default function App() {
  return (

    <SafeAreaView style={styles.container}>
        <StackNavigation />
        <StatusBar hidden={true} />
        <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'rgb(2 6 23)',
      justifyContent: "flex-start",
  },
});
