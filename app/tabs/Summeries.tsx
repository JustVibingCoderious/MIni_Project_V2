import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

type Datas = {
    DataStr : string,
    DataInt : string,
}

export default function Summary() {
    const [total, setTotal] = useState<number>(0);
    const [itemCount, setItemCount] = useState<number>(0);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            CalculateTotal();
        }
    }, [isFocused]);

    async function CalculateTotal() {
        try {
            const data = await AsyncStorage.getItem("AllKeyData");
            if (data != null) {
                const parsedData: Datas[] = JSON.parse(data);
                
                // Filter out non-numeric entries and sum the rest
                const finalTotal = parsedData.reduce((acc, item) => {
                    const numericValue = parseFloat(item.DataInt);
                    return !isNaN(numericValue) ? acc + numericValue : acc;
                }, 0);

                const validItemsCount = parsedData.filter(item => !isNaN(parseFloat(item.DataInt))).length;

                setTotal(finalTotal);
                setItemCount(validItemsCount);
            }
        } catch (e) {
            console.error("Error calculating data", e);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            <Text style={styles.header}>Statistics</Text>
            
            <View style={styles.card}>
                <Text style={styles.label}>Total Spendings</Text>
                <Text style={styles.amount}>
                    {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}$
                </Text>
                
                <View style={styles.badge}>
                    <View style={styles.dot} />
                    <Text style={styles.badgeText}>{itemCount} items</Text>
                </View>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Currency</Text>
                    <Text style={styles.infoValue}>USD</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Status</Text>
                    <Text style={[styles.infoValue, { color: '#4ade80' }]}>Available</Text>
                </View>
            </View>

            <Text style={styles.footerNote}>
                Invalid "DataInt" strings are automatically excluded from the sum.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#0f172a', // Deep Navy/Slate
        padding: 24, 
        justifyContent: 'center' 
    },
    header: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        color: '#f8fafc', 
        marginBottom: 24, 
        textAlign: 'left' 
    },
    card: {
        backgroundColor: '#1e293b', // Lighter Slate for the card
        borderRadius: 30,
        padding: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#334155',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    label: { 
        color: '#94a3b8', 
        fontSize: 14, 
        fontWeight: '600', 
        textTransform: 'uppercase',
        letterSpacing: 1.5
    },
    amount: { 
        color: '#4ade80', // Neon emerald for contrast
        fontSize: 48, 
        fontWeight: 'bold', 
        marginVertical: 12 
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 50,
        marginTop: 10
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4ade80',
        marginRight: 8
    },
    badgeText: { 
        color: '#f8fafc', 
        fontSize: 12, 
        fontWeight: '700' 
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    infoBox: {
        backgroundColor: '#1e293b',
        width: '48%',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#334155',
    },
    infoLabel: {
        color: '#94a3b8',
        fontSize: 12,
        marginBottom: 4
    },
    infoValue: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: '600'
    },
    footerNote: {
        marginTop: 40,
        textAlign: 'center',
        color: '#475569',
        fontSize: 12,
        lineHeight: 18
    }
});