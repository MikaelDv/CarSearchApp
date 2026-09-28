import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import SearchNavigator from "./SearchNavigator";
import ComparatorNavigator from "./ComparatorNavigator";
import { colors } from "../theme";

const Tab = createBottomTabNavigator();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.accent,
    background: colors.background,
    card: colors.fordBlue,
    text: colors.text,
    border: colors.fordBlue,
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            backgroundColor: colors.fordBlue,
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name="Buscar"
          component={SearchNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="car-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Comparar"
          component={ComparatorNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="git-compare-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
