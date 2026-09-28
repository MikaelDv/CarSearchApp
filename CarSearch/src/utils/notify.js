import { Alert, Platform } from "react-native";

// Alert.alert não faz nada no react-native-web, então usamos window.alert lá.
export function notify(title, message) {
  if (Platform.OS === "web") {
    window.alert(message ? `${title}\n\n${message}` : title);
  } else {
    Alert.alert(title, message);
  }
}
