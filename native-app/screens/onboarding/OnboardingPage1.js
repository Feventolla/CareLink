import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const OnboardingPage1 = ({ navigation }) => {
  const handleSkipPress = () => {
   
    navigation.navigate('OnboardingPage3');
  };

  const handleNextPress = () => {

  };

  return (
    <View style={styles.container}>
      
      <View style={styles.topBar}>
        <View style={styles.barsContainer}>
          <View style={[styles.bar, styles.activeBar]} />
          <View style={styles.bar} />
          <View style={styles.bar} />
       
        </View>
     
        <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

     
      <View style={styles.textContainer}>
        <Text style={styles.careLinkText}>
          Care<Text style={styles.linkText}>Link</Text>
        </Text>
        <Text style={styles.subText}>Find hospitals near you</Text>
      </View>

      <Image
        source={require('../../assets/image1.png')}
        style={styles.image}
      />

    
      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <View style={styles.nextButtonContent}>
         
          <Text style={styles.nextButtonText}>{}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    // position: 'absolute',
    bottom: 100,
    width: 90, 
    height: 5, 
    backgroundColor: '#D3D3D3', 
    marginHorizontal: 5,
    borderRadius: 5, 
  },
  activeBar: {
    backgroundColor: '#C276F0',
  },
  skipButton: {
    position: 'absolute',
    // top: 20,
    bottom: 95,
    right: 20,
  },
  skipText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'flex-start',
    
    marginLeft: 20,
  },
  careLinkText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#C276F0',
    right:100,
  },
  linkText: {
    color: 'black',
    
  },
  subText: {
    fontSize: 14,
    color: 'black',
    right:95,
  },
  image: {
    marginTop: 20,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#C276F0', 
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
  },
  nextButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5, 
  },
});

export default OnboardingPage1;
