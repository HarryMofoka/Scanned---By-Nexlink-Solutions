import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { colors } from '../theme/tokens';

// Screens
import SplashScreen    from '../screens/SplashScreen';
import WelcomeScreen   from '../screens/WelcomeScreen';
import LoginScreen     from '../screens/LoginScreen';
import SignUpScreen    from '../screens/SignUpScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import QRCodeScreen    from '../screens/QRCodeScreen';
import NFCWriteScreen  from '../screens/NFCWriteScreen';
import StatsScreen     from '../screens/StatsScreen';
import SettingsScreen  from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

/** Simple icon dot for tabs */
function TabIcon({ color }) {
  return <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }} />;
}

/** Main tab navigator (post-login) */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.bgCardDark, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accentCoral,
        tabBarInactiveTintColor: colors.textOnDarkMuted,
      }}
    >
      <Tab.Screen name="Home"     component={DashboardScreen} options={{ tabBarIcon: TabIcon }} />
      <Tab.Screen name="QR Code"  component={QRCodeScreen}    options={{ tabBarIcon: TabIcon }} />
      <Tab.Screen name="Stats"    component={StatsScreen}     options={{ tabBarIcon: TabIcon }} />
      <Tab.Screen name="Settings" component={SettingsScreen}  options={{ tabBarIcon: TabIcon }} />
    </Tab.Navigator>
  );
}

/** Root navigator */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bgBase },
        }}
      >
        <Stack.Screen name="Splash"       component={SplashScreen} />
        <Stack.Screen name="Welcome"      component={WelcomeScreen} />
        <Stack.Screen name="Login"        component={LoginScreen} />
        <Stack.Screen name="SignUp"       component={SignUpScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="Main"         component={MainTabs} />
        <Stack.Screen name="NFCWrite"     component={NFCWriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
