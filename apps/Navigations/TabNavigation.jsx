import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; import Home from '../Screens/Home';
import { useNavigation } from "@react-navigation/native"
import Services from '../../utils/Services'
import React, { useEffect } from 'react'

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation()

    useEffect(() => {
        checkUserAuth()
    }, [])

    const checkUserAuth = async () => {
        const result = await Services.getData("login")
        if (result !== "true") {
            navigation.replace("Login")
        }
    }
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name="tab-home" component={Home} />
        </Tab.Navigator>
    );
}