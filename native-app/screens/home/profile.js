import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

const ProfilePage = ({ navigation }) => {
  const currentLanguage = useSelector((state) => state.auth.language);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };
    getUser();
  }, []);

  const handleEditProfile = () => {};

  const handleViewPosts = () => {};

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userData");
    setUser(null);
    navigation.reset({
      index: 0,
      routes: [{ name: "Signin" }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require("../../assets/hospital-hero.jpg")}
          style={styles.coverPhoto}
        />
        <Image
          source={{ uri: user?.patient?.photo || "assets/doc1-hero.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>
          {user?.patient?.firstname || "Firstname"}
        </Text>
        <Text style={styles.profileDetails}>
          {user?.patient?.lastname || "Lastname"}
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleEditProfile}
        >
          <Icon name="edit" size={24} color="#333" />
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleViewPosts}>
          <Icon name="description" size={24} color="#333" />
          <Text style={styles.actionButtonText}>View Posts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="exit-to-app" size={24} color="#333" />
          <Text style={styles.actionButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 20,
  },
  coverPhoto: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginTop: -50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileDetails: {
    fontSize: 16,
    color: "#666",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    alignItems: "center",
  },
  logoutButton: {
    alignItems: "center",
  },
  actionButtonText: {
    marginTop: 5,
  },
});

export default ProfilePage;
