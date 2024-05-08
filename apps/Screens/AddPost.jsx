import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { client } from "../../utils/KindeConfig"
import { app } from "../../utils/FirebaseConfig"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const AddPost = () => {

    const [input, setInput] = useState({})
    const [image, setImage] = useState(null);
    const [user, setUser] = useState("")
    const storage = getStorage();
    const db = getFirestore(app);

    const loadUser = async () => {
        const userProfile = await client.getUserDetails();
        setUser(userProfile);
        console.log(userProfile);
    }
    useEffect(() => {
        loadUser()
    }, [])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onSubmitMethod = async () => {
        try {
            const resp = await fetch(image);
            const blob = await resp.blob();
            const storageRef = ref(storage, `communityPost/${Date.now()}.jpg`);
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);

            const newInput = {
                ...input,
                userImage: downloadURL,
                userName: user.given_name + " " + user.family_name,
                userEmail: user.email
            };

            const docRef = await addDoc(collection(db, "UserPost"), newInput);

            if (docRef.id) {
                Alert.alert("Post Added Successfully");
            }
        } catch (error) {
            console.error("Error uploading post: ", error);
            Alert.alert("Error", "Failed to add post. Please try again.");
        }
    }


    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white", }}>
            <KeyboardAvoidingView style={{ padding: 20 }}>
                <Text style={{ marginTop: 40, fontSize: 30, fontWeight: "bold" }}>Add New Post</Text>
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 15, marginTop: 5 }}>Create New Post and Start Selling</Text>
                <View style={{ marginTop: 20, gap: 10 }}>
                    <TouchableOpacity onPress={pickImage}>
                        {image ? <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 20 }} /> : <Image source={require("../../assets/placeholder.jpeg")} style={{ width: 100, height: 100, borderRadius: 20 }} />}
                    </TouchableOpacity>
                    <TextInput placeholder='Title' style={{ padding: 20, borderRadius: 10, borderWidth: 1 }}
                        onChangeText={(text) => setInput({ ...input, title: text })}
                    />
                    <TextInput placeholder='Description' style={{ width: "100%", height: "100%", textAlignVertical: "top", padding: 20, borderRadius: 10, borderWidth: 1, height: 150, }} multiline={true}
                        onChangeText={(text) => setInput({ ...input, description: text })}
                    />
                    <TextInput placeholder='Price' style={{ padding: 20, borderRadius: 10, borderWidth: 1 }}
                        onChangeText={(text) => setInput({ ...input, price: text })} keyboardType='number-pad'
                    />
                    <TextInput placeholder='Address' style={{ padding: 20, borderRadius: 10, borderWidth: 1 }}
                        onChangeText={(text) => setInput({ ...input, address: text })}
                    />
                    <View style={{ padding: 20, borderRadius: 10, borderWidth: 1 }}>
                        <RNPickerSelect
                            onValueChange={(text) => setInput({ ...input, category: text })}
                            items={[
                                { label: 'Football', value: 'football' },
                                { label: 'Baseball', value: 'baseball' },
                                { label: 'Hockey', value: 'hockey' },
                            ]}
                        />
                    </View>
                    <TouchableOpacity style={{ backgroundColor: "#0096FF", padding: 20, borderRadius: 10, marginTop: 40 }} onPress={onSubmitMethod}>
                        <Text style={{ color: "white", textAlign: "center" }}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default AddPost

const styles = StyleSheet.create({})