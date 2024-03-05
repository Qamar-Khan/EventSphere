import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS } from '../../constants/theme';

const HelpAndFeedBackScreen = ({ navigation }) => {
    return (
        <View style={styles.ContentContainer}>
            <View style={styles.Container}>
                <TouchableOpacity style={styles.Back} onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back' size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.Header}>Help and Feedback</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.description}>
                    Welcome to EventSpherePro Help and Feedback section. If you have any questions or feedback regarding the app, please feel free to reach out to us.
                </Text>
            </View>

            <View style={styles.contactContainer}>
                <Text style={styles.contactTitle}>Contact Us:</Text>
                <TouchableOpacity
                    style={styles.contactButton}
                    onPress={() => {}} >

                    <MaterialCommunityIcons name="email" size={20} color={COLORS.white} style={styles.contactIcon} />
                    <Text style={styles.contactButtonText}>Send Email</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ContentContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    Container: {
        marginHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Back: {
        position: 'absolute',
        left: 0,
    },
    Header: {
        color: COLORS.black,
        ...FONTS.h2,
        fontWeight: 'bold',
    },
    content: {
        marginBottom: 24,
        paddingHorizontal: 26,
        marginTop:40
    },
    description: {
        fontSize: 16,
        color: COLORS.black,
    },
    contactContainer: {
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
        color: COLORS.black,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        elevation: 2,
    },
    contactIcon: {
        marginRight: 8,
    },
    contactButtonText: {
        fontSize: 16,
        color: COLORS.white,
        fontWeight: 'bold',
    },
});


export default HelpAndFeedBackScreen;
