import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
const Detaildoctor = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/doc1-hero.jpg")}
        style={styles.image}
      />
      <View style={styles.overlayContainer}>
        <ScrollView>
          <Text style={styles.docname}>Dr. Linda</Text>
          <Text style={styles.spec}>Dermatologist</Text>
          <Text style={styles.years}>
            <Icon name="timer" size={25} color="#C276F0" /> 2 Years of
            Experience
          </Text>
          <Text style={styles.desc}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Dignissimos aperiam dolorem maiores quo quae voluptatibus quas
          </Text>
          <Text style={styles.hospdesc}>Betezatha hospital</Text>
          <Text style={styles.location}>
            <Icon name="location-on" size={25} color="#C276F0" />
            King Street, Arada, Arat Killo
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Direct contact</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    // flex: 1,
    width: "100%",
    height: "70%",
    resizeMode: "cover",
  },
  overlayContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "55%",
    backgroundColor: "white",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    padding: 20,
  },
  docname: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 10,
  },
  spec: {
    fontSize: 20,
    color: "#1E78C0",
    padding: 5,
  },
  years: {
    padding: 5,
    fontSize: 15,
  },
  desc: {
    fontSize: 15,
    padding: 5,
  },
  hospdesc: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  location: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#C276F0",
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#C276F0",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Detaildoctor;
