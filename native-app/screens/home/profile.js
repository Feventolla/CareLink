// import React from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons"; // Use the appropriate icon library

// const ProfilePage = () => {
//   const handleLogout = () => {
//     // Add your logout logic here
//     // For example, you might navigate to the login screen or clear user authentication.
//     console.log("User logged out");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.profileContainer}>
//         <Image
//           source={require("../../assets/hospital-hero.jpg")} // Replace with your profile image source
//           style={styles.profileImage}
//         />
//         <Text style={styles.profileName}>John Doe</Text>
//         <Text style={styles.profileDetails}>Software Developer</Text>
//       </View>

//       <View style={styles.actionsContainer}>
//         <TouchableOpacity style={styles.actionButton}>
//           <Icon name="mail-outline" size={24} color="#333" />
//           <Text style={styles.actionButtonText}>Message</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionButton}>
//           <Icon name="phone" size={24} color="#333" />
//           <Text style={styles.actionButtonText}>Call</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionButton}>
//           <Icon name="star-border" size={24} color="#333" />
//           <Text style={styles.actionButtonText}>Favorite</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Icon name="exit-to-app" size={24} color="#333" />
//           <Text style={styles.actionButtonText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   profileContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 10,
//   },
//   profileName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   profileDetails: {
//     fontSize: 16,
//     color: "#666",
//   },
//   actionsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//   },
//   actionButton: {
//     alignItems: "center",
//   },
//   logoutButton: {
//     alignItems: "center",
//     marginTop: 20,
//   },
//   actionButtonText: {
//     marginTop: 5,
//   },
// });

// export default ProfilePage;

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ProfilePage = () => {
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
          source={require("../../assets/hospital-hero.jpg")}
          style={styles.coverPhoto}
        />
        <Image
          source={require("../../assets/doc1-hero.jpg")} // Replace with your profile image source
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileDetails}>Software Developer</Text>
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
