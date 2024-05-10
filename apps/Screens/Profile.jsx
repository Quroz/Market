import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { client } from "../../utils/KindeConfig"
import { useNavigation } from "@react-navigation/native"

const Profile = () => {

    const [user, setUser] = useState("")
    const navigation = useNavigation()

    const loadUser = async () => {
        const userProfile = await client.getUserDetails();
        setUser(userProfile);
        console.log(userProfile);
    }

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


    useEffect(() => {
        loadUser()
    }, [])

    return (
        <View>
            <View style={{ alignItems: "center", marginTop: 70, gap: 10 }}>
                <Image source={{ uri: user.picture }} style={{ width: 100, height: 100, borderRadius: 99 }} />
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>{user.given_name} {user.family_name}</Text>
                <Text style={{ color: "gray", fontSize: 17 }}>{user.email}</Text>
            </View>
            <View style={{ marginTop: 50, padding: 20, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                    <TouchableOpacity style={{ backgroundColor: "lightblue", padding: 20, borderWidth: 1, borderColor: "blue", flex: 1, height: "100%", alignItems: "center", borderRadius: 10 }}>
                        <Text style={{ fontSize: 11, color: "blue" }}>My Products</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "lightblue", padding: 20, borderWidth: 1, borderColor: "blue", flex: 1, height: "100%", alignItems: "center", borderRadius: 10 }}
                        onPress={() => navigation.navigate("Explore")}
                    >
                        <Text style={{ fontSize: 11, color: "blue" }}>Explore</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "lightblue", padding: 20, borderWidth: 1, borderColor: "blue", flex: 1, height: "100%", borderRadius: 10, alignItems: "center", }}>
                        <Text style={{ fontSize: 11, color: "blue" }}>TubeGuruji</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ backgroundColor: "lightblue", padding: 20, borderWidth: 1, borderColor: "blue", width: "100%", marginTop: 10, borderRadius: 10 }}
                    onPress={handleLogout}
                >
                    <Text style={{ color: "blue", fontSize: 17, fontWeight: "bold", textAlign: "center" }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})