import {View, Text, TextInput, TouchableOpacity, StyleSheet} from  'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from "expo-router";

export default function Add(){

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    
    // Logic kept exactly as provided
    const [AllData, SetAllData] = useState("")

    useEffect(()=>{
        LoadData()
    }, [AllData])
    
    async function LoadData() {
        const data = await AsyncStorage.getItem("AllKeyData")
        if(data != null){
            SetAllData(JSON.parse(data))
        }
    }

    async function AddData() {
        const Data = {
            DataStr : name,
            DataInt : price,
        }
        
        console.log(Data)

        // Logic kept exactly as provided
        const NewData = [...AllData, Data]
        await AsyncStorage.setItem("AllKeyData", JSON.stringify(NewData))
        setName("")
        setPrice("")
    }

    return(
    <View style={MyStyle.container}>
        
        <Text style={MyStyle.header}>Add New Item</Text>

        {/* Preview of what you are typing */}
        <View style={MyStyle.previewContainer}>
            <Text style={MyStyle.label}>Preview:</Text>
            <Text style={MyStyle.previewText}>
                {name || "..."}  |  {price || "..."}
            </Text>
        </View>
        
        {/* Name Input */}
        <TextInput 
            style={MyStyle.input} 
            value={name} 
            onChangeText={setName}
            placeholder="Enter Name"
            placeholderTextColor="#999"
        />
        
        {/* Price Input */}
        <TextInput 
            style={MyStyle.input} 
            value={price} 
            onChangeText={setPrice}
            placeholder="Enter Price"
            placeholderTextColor="#999"
            keyboardType="numeric" // visual helper for numbers
        />

        {/* Save Button */}
        <TouchableOpacity onPress={AddData} style={MyStyle.button} activeOpacity={0.8}>
            <Text style={MyStyle.buttonText}>SAVE DATA</Text>
        </TouchableOpacity>
    </View>
    )
}

const MyStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f5'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    previewContainer: {
        marginBottom: 20,
        alignItems: 'center'
    },
    label: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4
    },
    previewText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333'
    },
    input:{
        width: "100%",
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
        // Shadow for depth
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    button: {
        width: "100%",
        backgroundColor: '#2563eb', // Nice bold blue
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1
    }
})