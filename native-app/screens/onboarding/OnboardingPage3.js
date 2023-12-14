import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const OnboardingPage3 = ({ navigation }) => {
  const handleNextPress = () => {

  };

  return (
    <View style={styles.container}>
    
      <View style={styles.topBar}>
        <View style={styles.barsContainer}>
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={[styles.bar, styles.activeBar]} />
        </View>
      </View>

      
      <View style={styles.textContainer}>
        <Text style={styles.careLinkText}>
          Get<Text style={styles.linkText}> Info</Text>
        </Text>
        <Text style={styles.subText}>Acquire information on what to do</Text>
      </View>

   
      <Image
        source={require('../../assets/image3.png')}
        style={styles.image}
      />

      
      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <View style={styles.nextButtonContent}>
          <Text style={styles.nextButtonText}>Get Started</Text>
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
    alignItems: 'center',
    marginTop: 20,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    width: 100,
    bottom: 90,
    height: 5,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeBar: {
    backgroundColor: '#C276F0', 
  },
  textContainer: {
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  careLinkText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#C276F0',
    right:70,
  },
  linkText: {
    color: 'black',
  },
  subText: {
    fontSize: 14,
    color: 'black',
    right: 65,
  },
  image: {
    marginTop: 20,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    width: 200,
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
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default OnboardingPage3;
