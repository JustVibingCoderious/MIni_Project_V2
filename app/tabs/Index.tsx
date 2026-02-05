import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from "expo-router";

type Datas = {
    DataStr : string,
    DataInt : string,
}

export default function Homer(){

    const [AllData, SetAllData] = useState<Datas[]>([])

    // Logic kept exactly as requested (Note: depending on [AllData] while setting it usually causes loops)
    useEffect(()=>{
        LoadData()
    }, [AllData])
    
    async function LoadData() {
        const data = await AsyncStorage.getItem("AllKeyData")
        if(data != null){
            SetAllData(JSON.parse(data))
        }
    }

    async function RemoveData(index : number) {
        const NewData = AllData.filter((_, i ) => i != index)
        SetAllData(NewData)
        await AsyncStorage.setItem("AllKeyData", JSON.stringify(NewData))
    }

    return(
        <View style={{ flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f4f4f5' }}>
            
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' }}>
                Current Data
            </Text>

            <FlatList
                data={AllData}
                keyExtractor={(_, i) => i.toString()}
                contentContainerStyle={{ paddingBottom: 50 }}
                renderItem={({item, index}) => (
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 16,
                        // Simple shadow for depth
                        elevation: 3, 
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.1,
                        shadowRadius: 4
                    }}>
                        {/* Data Display */}
                        <View style={{ marginBottom: 12 }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>
                                Name: <Text style={{ fontWeight: 'normal' }}>{item.DataStr.toString()}</Text>
                            </Text>
                            <Text style={{ fontSize: 16, color: '#666', marginTop: 4 }}>
                                Price: <Text style={{ fontWeight: 'bold', color: '#2e7d32' }}>{item.DataInt.toString()}</Text>
                            </Text> 
                        </View>

                        {/* Delete Button - Made large and easy to press */}
                        <TouchableOpacity 
                            onPress={() => RemoveData(index)}
                            activeOpacity={0.7}
                            style={{
                                backgroundColor: '#fee2e2', // Light red background
                                paddingVertical: 12,
                                borderRadius: 8,
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: '#ef4444'
                            }}
                        >
                            <Text style={{ color: '#dc2626', fontWeight: 'bold', fontSize: 16 }}>
                                | Penus Deletos |
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}