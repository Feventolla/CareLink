import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const LanguageDropdown = ({ currentLanguage, onChangeLanguage }) => {
    return (
        <View >
            <TouchableOpacity onPress={() => onChangeLanguage('am')} >
                <Text>{currentLanguage === 'en' ? 'English' : 'Amharic'}</Text>
            </TouchableOpacity>
        </View>
    );
};




export default LanguageDropdown;
