import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Services from '../../utils/Services'
import { useNavigation } from "@react-navigation/native"
import { client } from "../../utils/KindeConfig"


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
        <View style={{ padding: 80 }}>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Home</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})