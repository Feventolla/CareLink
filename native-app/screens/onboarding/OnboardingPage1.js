import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const OnboardingPage1 = () => {
  const navigation = useNavigation();

  const goToNextPage = () => {

    navigation.navigate('OnboardingPage2');
  };

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <View style={[styles.bar, styles.activeBar]} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </View>


      <TouchableOpacity onPress={goToNextPage} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

  
      <View style={styles.content}>
  
        <Text style={styles.logoText}>
          <Text style={styles.blackText}>Care</Text>
          <Text style={styles.purpleText}>Link</Text>
        </Text>

 
        <Text style={styles.descriptionText}>Find hospitals near you</Text>

 
        <Image source={require('./assets/image1.png')} style={styles.image} />

        <View style={styles.iconContainer}>
          <Icon name="circle" size={20} color="#8B5CBF" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({


  iconContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});

export default OnboardingPage1;
