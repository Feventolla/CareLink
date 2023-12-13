import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import { NavigationContainer } from "@react-navigation/native";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialIcons";

// import HomeScreen from "../../screens/home/home";
// import ProfileScreen from "../../screens/home/profile";
// const Tab = createMaterialBottomTabNavigator();

const Landingpage = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroContainer}>
        <Text style={styles.heroText_care}>
          Care<Text style={styles.heroText}>Link</Text>
        </Text>
        <Image
          source={require("../../assets/hero-doc.png")}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.heroImagesMainContainer}>
        <View style={styles.heroImagesContainer}>
          <Image
            source={require("../../assets/hero-doc.png")}
            style={styles.heroImage}
          />
          <Image
            source={require("../../assets/hero-hosp.png")}
            style={styles.heroImage2}
          />
        </View>
        <Image
          source={require("../../assets/hero-hosp.png")}
          style={styles.heroImage3}
        />
      </View>
      <Text style={styles.hosp_search}>Find Hospitals Nearby </Text>
      <Text style={styles.hosp_search}>Find Hospitals Nearby </Text>
      <Text style={styles.hosp_search}>Find Hospitals Nearby </Text>
      <Text style={styles.hosp_search}>Find Hospitals Nearby </Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          // onChangeText={handleSearch}
          // value={searchText}
        />
        <Icon
          name="search"
          size={30}
          color="#C276F0"
          style={styles.searchIcon}
        />
      </View>
      <Text style={styles.hosp_aval}>Hospitals Available here</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
    // justifyContent: "center",
  },
  heroContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 70,
  },
  heroText: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
  },
  heroText_care: {
    color: "#C276F0",
    fontSize: 40,
    fontWeight: "bold",
    // fontFamily: "po",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 80,
    marginTop: 10,
  },
  heroImagesContainer: {
    flexDirection: "column",
    // marginTop: 20,
  },
  heroImagesMainContainer: {
    flexDirection: "row",
    paddingLeft: 20,
  },
  heroImage: {
    width: 190,
    height: 150,
    borderTopLeftRadius: 30, // adjust as needed to create an oval shape
    borderTopRightRadius: 110, // adjust as needed to create an oval shape
    borderBottomLeftRadius: 120, // adjust as needed to create an oval shape
    borderBottomRightRadius: 40, // adjust as needed to create an oval shape
    marginLeft: 10,
  },
  heroImage2: {
    width: 180,
    height: 110,
    borderTopLeftRadius: 30, // adjust as needed to create an oval shape
    borderTopRightRadius: 100, // adjust as needed to create an oval shape
    borderBottomLeftRadius: 120, // adjust as needed to create an oval shape
    borderBottomRightRadius: 40,
    marginTop: 20,
    marginLeft: 10, // adjust as needed to create an oval shape
    // marginRight: 10,
  },
  heroImage3: {
    width: 180,
    height: 250,
    borderTopRightRadius: 30, // adjust as needed to create an oval shape
    borderTopLeftRadius: 170, // adjust as needed to create an oval shape
    borderBottomRightRadius: 250, // adjust as needed to create an oval shape
    borderBottomLeftRadius: 30,
    marginRight: 40,
    marginLeft: 10,
    marginTop: 20,
  },
  hosp_search: {
    marginTop: 20,
    fontSize: 45,
    textAlign: "center",
    fontWeight: "bold",
  },
  hosp_aval: {
    padding: 60,
    marginTop: 20,
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
  },
  searchContainer: {
    position: "relative",
  },
  searchInput: {
    height: 50,
    width: 280,
    backgroundColor: "white",
    borderRadius: 20,
    // borderColor: "#ffffff",
    // borderWidth: 1,
    paddingLeft: 30, // Adjusted padding to accommodate the icon
    paddingRight: 10,
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default Landingpage;
