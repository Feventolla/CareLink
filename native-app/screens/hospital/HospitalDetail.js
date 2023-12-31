import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const HospitalDetailPage = ({ hospitalId }) => {
  const hospitalData = {
    id: "1",
    title: "Dagmawi Minilik Hospital",
    address: "King Street, Arada, Arat Killo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat lectus pellentesque sollicitudin egestas. Praesent pharetra ullamcorper urna ut fringilla. Integer ornare sit amet est at tempus. si Praesent pharetra ullamcorper urna ut fringilla. Integer lal ornare sit amet est at tempus. Praesent pharetra te leyy ullamcorper urna at ut fringilla. Integer ornare sit amet est at tempus. Praesent he pharetra ullamcorper urna ut fringilla. di dy Integer ornare sit amet est at tempus. Praesent ko pharetra ullamcorper par urna ut fringilla. Integer ornare sit amet est at tempus.",
  };

  const doctorsData = [
    {
      id: "1",
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      imageUrl: require("../../assets/images/hospital/doc3.jpg"),
    },
    {
      id: "2",
      name: "Dr. Jane Smith",
      specialty: "Orthopedic",
      imageUrl: require("../../assets/images/hospital/doc4.jpg"),
    },
    {
      id: "3",
      name: "Dr. Jane Smith",
      specialty: "Orthopedic",
      imageUrl: require("../../assets/images/hospital/doc5.jpeg"),
    },
    {
      id: "4",
      name: "Dr. Jane Smith",
      specialty: "Orthopedic",
      imageUrl: require("../../assets/images/hospital/doc6.jpeg"),
    },
    {
      id: "5",
      name: "Dr. Jane Smith",
      specialty: "Orthopedic",
      imageUrl: require("../../assets/images/hospital/doc6.jpeg"),
    },
    {
      id: "6",
      name: "Dr. Jane Smith",
      specialty: "Orthopedic",
      imageUrl: require("../../assets/images/hospital/doc6.jpeg"),
    },
  ];

  const navigation = useNavigation();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDoctorItem = ({ item }) => (
    <View style={styles.doctorCard}>
      <Image source={item.imageUrl} style={styles.doctorImage} />
      <View style={styles.doctorData}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Image
        source={require("../../assets/images/hospital/hos2.jpeg")}
        style={styles.image}
      />
      <View style={styles.overlayContainer}>
        <View style={styles.hospitalCard}>
          <Text style={styles.hospitalTitle}>{hospitalData.title}</Text>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Icon name="location-on" size={15} color="#C276F0" />
              <Text style={styles.addressText}>{hospitalData.address}</Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.visitGalleryButtonText}>Visit Gallery</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={doctorsData}
            keyExtractor={(item) => item.id}
            renderItem={renderDoctorItem}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ flex: 1 }}
                >
                  <Text style={styles.descriptionText}>
                    {showFullDescription
                      ? hospitalData.description
                      : `${hospitalData.description.slice(0, 150)}...`}
                    {"  "}
                    {!showFullDescription && (
                      <Text
                        style={styles.seeMoreButton}
                        onPress={toggleDescription}
                      >
                        See More
                      </Text>
                    )}
                    {showFullDescription && (
                      <Text
                        style={styles.seeMoreButton}
                        onPress={toggleDescription}
                      >
                        Show Less
                      </Text>
                    )}
                  </Text>
                </ScrollView>
                <Text style={styles.sectionTitle}>Available Doctors</Text>
              </>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
  },
  overlayContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#C276F0",
    marginBottom: 25,
  },
  hospitalCard: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 25,
  },
  hospitalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
  },

  addressText: {
    color: "#C276F0",
    fontSize: 15,
  },
  visitGalleryButtonText: {
    color: "#C276F0",
    fontWeight: "bold",
    fontSize: 15,
  },
  descriptionText: {
    fontSize: 14,
    marginBottom: 16,
    color: "#666666",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  doctorCard: {
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    padding: 8,
    alignItems: "start",
    flexDirection: "row",
    marginBottom: 20,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: "contain",
  },
  doctorData: {
    flexDirection: "col",
    justifyContent: "center",
    // alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  doctorSpecialty: {
    fontSize: 12,
    color: "#C276F0",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  descriptionContainer: {
    flexDirection: "row",
  },
  seeMoreButton: {
    color: "#C276F0",
    alignSelf: "flex-start",
    fontSize: 12,
    marginLeft: 10,
  },
});

export default HospitalDetailPage;
