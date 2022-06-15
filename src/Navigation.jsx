import React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import Home from './screens/Home'

const Stack = createNativeStackNavigator()

export default function Navigation() {
    function screenOptions(navigation, title, backgroundColor = '#E5E5E5') {
        return {
            title,
            headerStyle: { backgroundColor },
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitleStyle,
            headerBackVisible: false,
        }
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigaton screenOptions={({ navigation }) => screenOptions(navigation)}>
                    <Stack.Group screenOptions={({ navigation }) => screenOptions(navigation, '', '#000')}>
                        <Stack.Screen name="Home" component={Home} />
                    </Stack.Group>
                </Stack.Navigaton>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
