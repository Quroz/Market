import { Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Services from '../../utils/Services'
import { useNavigation } from "@react-navigation/native"
import { client } from "../../utils/KindeConfig"
import Heading from '../Components/Heading'
import Slider from '../Components/Slider'
import Categories from '../Components/Categories'
import ProductList from '../Components/ProductList'


const Home = () => {


    const navigation = useNavigation()

    return (
        <View style={{ paddingHorizontal: 20, paddingVertical: 40, flex: 1, backgroundColor: "white" }}>
            <Heading />
            <Slider />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <Categories />
                <ProductList />
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})