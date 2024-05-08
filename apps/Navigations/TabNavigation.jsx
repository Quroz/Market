import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; import Home from '../Screens/Home';
import { useNavigation } from "@react-navigation/native"
import Services from '../../utils/Services'
import React, { useEffect } from 'react'
import ExploreScreen from '../Screens/ExploreScreen';
import AddPost from '../Screens/AddPost';
import Profile from '../Screens/Profile';
import { Text } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

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
            <Tab.Screen name="tab-home" component={Home} options={{
                tabBarLabel: ({ color }) => (
                    <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Home</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="AddPost" component={AddPost} options={{
                tabBarLabel: ({ color }) => (
                    <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Add Post</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="camera" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="Explore" component={ExploreScreen} options={{
                tabBarLabel: ({ color }) => (
                    <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Explore</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                    <AntDesign name="search1" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarLabel: ({ color }) => (
                    <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>Profile</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="person" size={size} color={color} />
                )
            }} />
        </Tab.Navigator>
    );
}