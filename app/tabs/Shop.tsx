import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Add() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    
    const [AllData, SetAllData] = useState<any[]>([])

    useEffect(() => {
        LoadData()
    }, [AllData])
    
    async function LoadData() {
        const data = await AsyncStorage.getItem("AllKeyData")
        if (data != null) {
            SetAllData(JSON.parse(data))
        }
    }

    async function AddData() {
        if (!name || !price) return; // Prevent saving empty items

        const Data = {
            DataStr: name,
            DataInt: price,
        }
        
        const NewData = [...AllData, Data]
        await AsyncStorage.setItem("AllKeyData", JSON.stringify(NewData))
        
        // Reset fields
        setName("")
        setPrice("")
    }

    return (
        <View style={MyStyle.container}>
            <StatusBar barStyle="light-content" />
            
            <Text style={MyStyle.header}>EggyStore</Text>

            {/* Preview Card */}
            <View style={MyStyle.previewContainer}>
                <Text style={MyStyle.label}>PREVIEW ITEM</Text>
                <View style={MyStyle.previewCard}>
                    <Text style={MyStyle.previewText}>
                        {name || "Item Name"}
                    </Text>
                    <Text style={MyStyle.previewPrice}>
                        {price ? `${price}$` : "$0.00"}
                    </Text>
                </View>
            </View>
            
            {/* Input Fields */}
            <TextInput 
                style={MyStyle.input} 
                value={name} 
                onChangeText={setName}
                placeholder="Enter Name"
                placeholderTextColor="#64748b"
            />
            
            <TextInput 
                style={MyStyle.input} 
                value={price} 
                onChangeText={setPrice}
                placeholder="Enter Price"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
            />

            {/* Save Button */}
            <TouchableOpacity onPress={AddData} style={MyStyle.button} activeOpacity={0.8}>
                <Text style={MyStyle.buttonText}>CONFIRM & SAVE</Text>
            </TouchableOpacity>
        </View>
    )
}

const MyStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#0f172a' // Deep Navy
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#f8fafc',
        marginBottom: 40,
        textAlign: 'center'
    },
    previewContainer: {
        marginBottom: 30,
        width: '100%'
    },
    label: {
        fontSize: 12,
        color: '#94a3b8',
        fontWeight: '700',
        marginBottom: 8,
        letterSpacing: 1
    },
    previewCard: {
        backgroundColor: '#1e293b',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#334155',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    previewText: {
        fontSize: 18,
        color: '#f8fafc',
        fontWeight: '500'
    },
    previewPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4ade80' // Emerald
    },
    input: {
        width: "100%",
        backgroundColor: '#1e293b',
        borderColor: '#334155',
        borderWidth: 1,
        borderRadius: 12,
        padding: 18,
        fontSize: 16,
        color: '#f8fafc',
        marginBottom: 16,
    },
    button: {
        width: "100%",
        backgroundColor: '#4ade80', // Emerald Green for "Action/Confirm"
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: "#4ade80",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#064e3b', // Dark green text for contrast on bright button
        fontWeight: '800',
        fontSize: 16,
        letterSpacing: 1.2
    }
})