import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Text, StyleSheet } from 'react-native';

const dashboard = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  })
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <Text>Dashboard</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default dashboard;
