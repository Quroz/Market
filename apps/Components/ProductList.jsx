import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getFirestore, getDocs, collection, orderBy } from "firebase/firestore"
import { app } from "../../utils/FirebaseConfig"


const ProductList = () => {

    const [products, setProducts] = useState([])
    const [user, setUser] = useState("")

    useEffect(() => {
        loadUser()
        getCategories()
    }, [])


    const loadUser = async () => {
        const userProfile = await client.getUserDetails();
        setUser(userProfile);
    }

    const db = getFirestore(app)
    const getCategories = async () => {
        setProducts([])
        const query = await getDocs(collection(db, "UserPost"), orderBy("createdAt", "desc"))
        query.forEach(doc => {
            setProducts(products => [...products, doc.data()])
        })
    }

    console.log(products)
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>Latest Items</Text>
            <FlatList
                data={products}
                numColumns={2}
                renderItem={(({ item }) => (
                    <View style={{ flex: 1, borderWidth: 0.5, borderColor: "lightgray", margin: 10, borderRadius: 5 }}>
                        {console.log("jo2,", item)}
                        <Image source={{ uri: item?.image }} style={{ height: 200, borderRadius: 5 }} />
                        <View style={{ padding: 5 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>{item?.address}</Text>
                            <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 5, color: "lightblue" }}>$ {item?.price}</Text>
                            <View style={{ padding: 5, backgroundColor: "lightblue", marginTop: 5, borderRadius: 99, width: "40%" }}>
                                <Text style={{ color: "blue", textAlign: "center", fontSize: 10 }}>{item?.category}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            />
        </View>
    )
}

export default ProductList

const styles = StyleSheet.create({})