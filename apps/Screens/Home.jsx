import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Services from '../../utils/Services'
import { useNavigation } from "@react-navigation/native"
import { client } from "../../utils/KindeConfig"
import Heading from '../Components/Heading'
import Slider from '../Components/Slider'
import Categories from '../Components/Categories'


const Home = () => {


    const navigation = useNavigation()

    const handleLogout = async () => {
        Alert.alert(
            "Log out",
            "Do you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        const loggedOut = await client.logout();
                        console.log(loggedOut)
                        if (loggedOut) {
                            await Services.storeData("login", "false")
                            navigation.replace("Login")
                        }
                    }
                }
            ]
        );
    }

    return (
        <View style={{ paddingHorizontal: 20, paddingVertical: 40, flex: 1, backgroundColor: "white" }}>
            <Heading />
            <Slider />
            <Categories />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})