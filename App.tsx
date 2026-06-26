import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { FoodsProvider } from './src/context/FoodsContext';
import { CartProvider } from './src/context/CartContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { colors } from './src/theme/colors';

function Splash() {
  return (
    <View style={styles.splash}>
      <Text style={styles.brand}>Foodgo</Text>
      <ActivityIndicator color={colors.white} size="large" style={styles.spinner} />
    </View>
  );
}

function AppShell() {
  const { restoring } = useAuth();
  if (restoring) return <Splash />;

  return (
    <FoodsProvider>
      <CartProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="dark" />
          </NavigationContainer>
        </FavoritesProvider>
      </CartProvider>
    </FoodsProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Splash />;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  spinner: {
    marginTop: 4,
  },
});
