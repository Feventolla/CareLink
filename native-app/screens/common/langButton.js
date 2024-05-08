// LanguageDropdown.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const LanguageDropdown = ({ currentLanguage, onChangeLanguage }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onChangeLanguage} style={styles.dropdown}>
                <Text>{currentLanguage === 'en' ? 'English' : 'Amharic'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    dropdown: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },
});

export default LanguageDropdown;
