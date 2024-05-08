import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getFirestore, getDocs, collection } from "firebase/firestore"
import { app } from "../../utils/FirebaseConfig"

const Categories = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
    }, [])

    const db = getFirestore(app)
    const getCategories = async () => {
        setCategories([])
        const query = await getDocs(collection(db, "Category"))
        query.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
            setCategories(categories => [...categories, doc.data()])
        })
    }
    return (
        <View style={{ width: "100%", marginTop: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>Categories</Text>
            <FlatList
                data={categories}
                numColumns={4}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ flex: 1, borderWidth: 1, margin: 5, padding: 5, borderColor: "lightgray", borderRadius: 5, alignItems: "center" }}>
                        <Image source={{ uri: item?.icon }} style={{ width: 40, height: 40 }} />
                        <Text style={{ marginTop: 5 }}>{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({})