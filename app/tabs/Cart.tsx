 import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

type Datas = {
    DataStr : string,
    DataInt : string,
}

export default function Homer(){
    const [AllData, SetAllData] = useState<Datas[]>([])
    const isFocused = useIsFocused()

    // Fixed: Updates when the screen is visited or data is modified locally
    useEffect(()=>{
        if(isFocused) {
            LoadData()
        }
    }, [isFocused])
    
    async function LoadData() {
        const data = await AsyncStorage.getItem("AllKeyData")
        if(data != null){
            SetAllData(JSON.parse(data))
        }
    }

    async function RemoveData(index : number) {
        const NewData = AllData.filter((_, i ) => i != index)
        // Update state first for instant UI feedback
        SetAllData(NewData)
        await AsyncStorage.setItem("AllKeyData", JSON.stringify(NewData))
    }

    return(
        <View style={{ flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#0f172a' }}>
            <StatusBar barStyle="light-content" />
            
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 24, color: '#f8fafc' }}>
                Current Items
            </Text>

            <FlatList
                data={AllData}
                keyExtractor={(_, i) => i.toString()}
                contentContainerStyle={{ paddingBottom: 50 }}
                ListEmptyComponent={
                    <Text style={{ color: '#64748b', textAlign: 'center', marginTop: 50 }}>
                        No items found.
                    </Text>
                }
                renderItem={({item, index}) => (
                    <View style={{
                        backgroundColor: '#1e293b',
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 16,
                        borderWidth: 1,
                        borderColor: '#334155',
                        elevation: 4, 
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 4},
                        shadowOpacity: 0.3,
                        shadowRadius: 5
                    }}>
                        {/* Data Display */}
                        <View style={{ marginBottom: 12 }}>
                            <Text style={{ fontSize: 14, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>
                                Item Name
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#f8fafc' }}>
                                {item.DataStr}
                            </Text>
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                <Text style={{ fontSize: 16, color: '#94a3b8' }}>Value: </Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4ade80' }}>
                                    {item.DataInt}$
                                </Text>
                            </View>
                        </View>

                        {/* Delete Button */}
                        <TouchableOpacity 
                            onPress={() => RemoveData(index)}
                            activeOpacity={0.8}
                            style={{
                                backgroundColor: '#7f1d1d', // Deep red
                                paddingVertical: 12,
                                borderRadius: 10,
                                alignItems: 'center',
                                marginTop: 4,
                                borderWidth: 1,
                                borderColor: '#b91c1c'
                            }}
                        >
                            <Text style={{ color: '#fecaca', fontWeight: 'bold', fontSize: 14 }}>
                                UN-LIST ITEM
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}