import { DarkTheme, DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

export default function App() {
  const colorScheme = useColorScheme();

  const theme: Theme = useMemo(
    () =>
      colorScheme === "dark"
        ? {
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              primary: "#fff",
              text: "#fff",
              background:'#000000'
            },
          }
        : {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: "#f5f5f5",
              text: "#191919",
              border: "#D9D9D9",
              primary: "#191919",
            },
          },
    [colorScheme]
  );
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
        <NavigationContainer theme={theme}>
            <RootNavigator />
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        </NavigationContainer>
    </SafeAreaProvider> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
