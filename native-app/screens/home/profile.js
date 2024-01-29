import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";


const ProfilePage = () => {

  const user = useSelector((state) => state.auth.user);


  const handleEditProfile = () => {
    // Logic for navigating to the profile editing screen
    console.log("Edit Profile");
  };

  const handleViewPosts = () => {
    // Logic for navigating to the user's posts or activity
    console.log("View Posts");
  };

  const handleLogout = () => {
    // Logic for logging out
    console.log("Logout");
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={require("../../assets/hospital-hero.jpg")} // Replace with your cover photo source
          style={styles.coverPhoto}
        />
        <Image
          source={{uri: user.patient.photo}} // Replace with your profile image source
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.patient.firstname}</Text>
        <Text style={styles.profileDetails}>{user.patient.lastname}</Text>
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
    // backgroundColor: "#C276F0",
    // borderBottomLeftRadius: 70,
    // borderBottomRightRadius: 70,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginTop: -50, // Adjust as needed to overlap with the cover photo
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
    // marginTop: 20,
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
