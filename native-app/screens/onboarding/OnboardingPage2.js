import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const OnboardingPage2 = () => {
  const navigation = useNavigation();

  const goToNextPage = () => {
    
    navigation.navigate('OnboardingPage3');
  };

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <View style={styles.bar} />
        <View style={[styles.bar, styles.activeBar]} />
        <View style={styles.bar} />
      </View>

      <TouchableOpacity onPress={goToNextPage} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>


      <View style={styles.content}>

        <Text style={styles.title}>
          <Text style={styles.blackText}>Chat</Text>
          <Text style={styles.purpleText}>Bot</Text>
        </Text>

      
        <Text style={styles.description}>Talk with our chatbot</Text>

        <Image source={require('./assets/image2.png')} style={styles.image} />

        <View style={styles.iconContainer}>
          <Icon name="circle" size={20} color="#8B5CBF" />
        </View>

       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: '#808080',
    marginBottom: 20,
  },

  image: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default OnboardingPage2;
