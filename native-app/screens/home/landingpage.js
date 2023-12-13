import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import { NavigationContainer } from "@react-navigation/native";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialIcons";
import ActionButton from "react-native-action-button";

const Landingpage = ({ navigation }) => {
  const handleFabPress = () => {
    // Handle the FAB press event
    navigation.navigate("Chatbot");
    console.log("Floating Action Button Pressed!");
  };
  const cards = [
    {
      id: "1",
      image: require("../../assets/hospital-hero.jpg"),
      title: "Hospital one",
      description:
        "Description Lorem ipsum dolor sit amet, consecte adipiscing elit. Adipiscing pharetra scelerisque ",
    },
    {
      id: "2",
      image: require("../../assets/hospital-hero.jpg"),
      title: "Hospital two",
      description:
        "Description Lorem ipsum dolor sit amet, consecte adipiscing elit. Adipiscing pharetra scelerisque ",
    },
    {
      id: "3",
      image: require("../../assets/hospital-hero.jpg"),
      title: "Hospital three",
      description:
        "Description Lorem ipsum dolor sit amet, consecte adipiscing elit. Adipiscing pharetra scelerisque ",
    },
    // Add more cards as needed
  ];

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
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
              source={require("../../assets/doc3-hero.jpg")}
              style={styles.heroImage}
            />
            <Image
              source={require("../../assets/hospital-hero.jpg")}
              style={styles.heroImage2}
            />
          </View>
          <Image
            source={require("../../assets/doc2-hero.jpg")}
            style={styles.heroImage3}
          />
        </View>
        <Text style={styles.hosp_search}>Find Hospitals Nearby </Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search hospitals..."
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
        <Text style={styles.hosp_avaldesc}>
          Find various articles about health here
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.container_card}
        >
          {cards.map((card) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => console.log(`Card ${card.id} pressed`)}
              key={card.id}
            >
              <Image source={card.image} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardDescription}>{card.description}</Text>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => console.log(`Card ${card.id} pressed`)}
                >
                  <Text style={styles.actionButtonText}>Read More</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
      <ActionButton
        buttonColor="#C276F0"
        onPress={handleFabPress}
        renderIcon={() => <Icon name="child-care" style={styles.fabIcon} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 70,
    // justifyContent: "center",
  },
  heroContainer: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 110,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 40,
    marginLeft: 10,
  },
  heroImage2: {
    width: 180,
    height: 110,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 40,
    marginTop: 20,
    marginLeft: 10,
    // marginRight: 10,
  },
  heroImage3: {
    width: 180,
    height: 250,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 170,
    borderBottomRightRadius: 250,
    borderBottomLeftRadius: 30,
    marginRight: 40,
    marginLeft: 10,
    marginTop: 20,
  },
  hosp_search: {
    marginTop: 30,
    fontSize: 45,
    textAlign: "center",
    fontWeight: "bold",
  },
  hosp_aval: {
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 30,
    marginTop: 20,
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
  },
  hosp_avaldesc: {
    paddingTop: 20,
    fontSize: 15,
    fontWeight: "300",
  },
  searchContainer: {
    marginTop: 10,
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
  container_card: {
    flexDirection: "row",
    padding: 16,
  },
  card: {
    width: 250,
    marginRight: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  cardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 20,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  actionButton: {
    // backgroundColor: "#3498db",
    padding: 10,
    // borderRadius: 5,
    // alignItems: "center",
  },
  actionButtonText: {
    color: "#C276F0",
    fontWeight: "bold",
  },
  fabIcon: {
    fontSize: 30,
    height: 30,
    color: "white",
  },
});

export default Landingpage;
