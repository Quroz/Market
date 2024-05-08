import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <Image source={require("../../assets/login.jpeg")} style={{ width: "100%", height: 400 }} />
            <View style={{ padding: 30, backgroundColor: "white", marginTop: -20, borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>Community Marketplace</Text>
                <Text style={{ fontSize: 18, color: "gray", marginTop: 18 }}>Buy Sell Marketplace where you can sell old items and make real money</Text>
                <TouchableOpacity style={{ padding: 12, backgroundColor: "#0096FF", borderRadius: 99, marginTop: 80 }} onPress={() => handleSignIn()}>
                    <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})