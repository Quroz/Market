import { Image, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { client } from "../../utils/KindeConfig"
import { Ionicons } from '@expo/vector-icons';

const Heading = () => {

    const [user, setUser] = useState("")

    const loadUser = async () => {
        const userProfile = await client.getUserDetails();
        setUser(userProfile);
        console.log(userProfile);
    }
    useEffect(() => {
        loadUser()
    }, [])
    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Image source={{ uri: user.picture }} style={{ borderRadius: 99, width: 50, height: 50 }} />
                <View>
                    <Text style={{ fontSize: 17 }}>Welcome</Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.given_name} {user.family_name}</Text>
                </View>
            </View>
            <View style={{ marginTop: 20, padding: 15, borderRadius: 99, backgroundColor: "#f9f9f9", flexDirection: "row", alignItems: "center", borderWidth: 0.5 }}>
                <Ionicons name="search" size={24} color="gray" />
                <TextInput placeholder='Search' style={{ width: "100%", marginLeft: 10 }} placeholderTextColor={"gray"} />
            </View>
        </View>
    )
}

export default Heading

const styles = StyleSheet.create({})