import './global.css';
import { SafeAreaView } from 'react-native';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/service/queryClient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
