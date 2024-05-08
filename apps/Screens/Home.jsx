import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Services from '../../utils/Services'
import { useNavigation } from "@react-navigation/native"
import { client } from "../../utils/KindeConfig"

const Home = () => {


    const navigation = useNavigation()
    useEffect(() => {
        checkUserAuth()
    }, [])

    const handleLogout = async () => {
        const loggedOut = await client.logout();
        console.log(loggedOut)
        if (loggedOut) {
            await Services.storeData("login", "false")
            navigation.replace("Login")
        }
    }

    const checkUserAuth = async () => {
        const result = await Services.getData("login")
        if (result !== "true") {
            navigation.replace("Login")
        }
    }
    return (
        <View>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Home</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})