import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFirestore, getDocs, collection, orderBy } from "firebase/firestore"
import { app } from "../../utils/FirebaseConfig"


const Slider = () => {

    const [slider, setSlider] = useState([])
    const db = getFirestore(app)

    useEffect(() => {
        getSlider()
    }, [])
    const getSlider = async () => {
        setSlider([])
        const query = await getDocs(collection(db, "Sliders"))
        query.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
            setSlider(slider => [...slider, doc.data()])
        })
    }

    return (
        <View style={{ marginTop: 20 }}>
            <FlatList
                data={slider}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Image source={{ uri: item?.image }} style={{ height: 200, width: 300, borderRadius: 5 }} />
                )}
            />
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({})