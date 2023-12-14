import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const OnboardingPage3 = ({ navigation }) => {
  const handleNextPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.barsContainer}>
          <TouchableOpacity
            style={styles.bar}
            onPress={() => navigation.navigate("Onboarding_one")}
          />
          <TouchableOpacity
            style={styles.bar}
            onPress={() => navigation.navigate("Onboarding_two")}
          />
          <TouchableOpacity style={[styles.bar, styles.activeBar]} />
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.careLinkText}>
          Get<Text style={styles.linkText}> Info</Text>
        </Text>
        <Text style={styles.subText}>Acquire information on what to do</Text>
      </View>

      <Image source={require("../../assets/image3.png")} style={styles.image} />

      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <View style={styles.nextButtonContent}>
          <Icon
            name="arrow-forward"
            size={30}
            color="white"
            style={styles.arrowready}
          />
          <Text style={styles.nextButtonText}>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    alignItems: "center",
    marginTop: 20,
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    width: 100,
    bottom: 90,
    height: 5,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeBar: {
    backgroundColor: "#C276F0",
  },
  textContainer: {
    alignItems: "flex-start",
    bottom: 50,
    marginLeft: 20,
  },
  careLinkText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#C276F0",
    right: 40,
  },
  linkText: {
    color: "black",
  },
  subText: {
    fontSize: 20,
    color: "black",
    right: 40,
    // left: 0,
  },
  image: {
    marginTop: 20,
  },
  nextButton: {
    position: "absolute",
    bottom: 20,
    width: 300,
    height: 60,
    backgroundColor: "#C276F0",
    borderRadius: 30,
    justifyContent: "center",
    // alignItems: "center",
    elevation: 5,
  },
  nextButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  arrowready: {
    width: 55,
    height: 55,
    backgroundColor: "#C276F0",
    borderRadius: 30,
    textAlign: "center",
    textAlignVertical: "center",
    elevation: 15,
  },
});

export default OnboardingPage3;
