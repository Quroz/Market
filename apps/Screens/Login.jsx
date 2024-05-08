import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { client } from "../../utils/KindeConfig"
import Services from '../../utils/Services'
import { useNavigation } from "@react-navigation/native"

const Login = () => {

    const navigation = useNavigation()
    const handleSignIn = async () => {
        const token = await client.login();
        if (token) {
            await Services.storeData("login", "true")
            navigation.replace("Home")
        }
    };
    return (
        <View>
            <TouchableOpacity onPress={handleSignIn}>
                <Text>LoginDSF</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})