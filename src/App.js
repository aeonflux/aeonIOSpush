import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  PushNotificationIOS
} from "react-native";
import Amplify from "aws-amplify";
import PushNotification from "@aws-amplify/pushnotification";
import aws_exports from "../aws-exports";

Amplify.configure(aws_exports);
PushNotification.configure(aws_exports);

class App extends Component {
  componentDidMount() {
    PushNotification.onNotification(notification => {
      console.log("in app notification", notification);
      // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    });

    // gets the registration token
    PushNotification.onRegister(token => {
      console.log("in app registration", token);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> This is aeonreactnativepush</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;
