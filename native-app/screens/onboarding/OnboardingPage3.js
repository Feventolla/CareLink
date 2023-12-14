import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OnboardingPage3 = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    // for now nilu
    console.log('pressed!');
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.topBar}>
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={[styles.bar, styles.activeBar]} />
      </View>

     
      <View style={styles.content}>
       
        <Text style={styles.title}>
          <Text style={styles.blackText}>Get</Text>
          <Text style={styles.purpleText}> Info</Text>
        </Text>

        <Text style={styles.description}>Acquire information on what to do</Text>

    
        <Image source={require('./assets/image3.png')} style={styles.image} />

    
        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
          <Icon name="arrow-forward" size={24} color="white" style={styles.icon} />
          <Text style={styles.getStartedButtonText}>Get started</Text>
        </TouchableOpacity>
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

  getStartedButton: {
    backgroundColor: '#8B5CBF',
    borderRadius: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  getStartedButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },

  icon: {
    marginRight: 10,
  },
});

export default OnboardingPage3;
