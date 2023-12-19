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
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useHospitalQuery } from "../../services/Hospital/hospital-api";
import { useDoctorQuery } from "../../services/Doctors/doctor-api";

const HospitalDetailPage = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;
  const { data, isLoading, error } = useHospitalQuery(id);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const fetchData = async () => {
  //       // Fetch data for the second query inside this function
  //       const {
  //         data: data2,
  //         isLoading: isLoading2,
  //         error: error2,
  //       } = useDoctorQuery(data?.hospital?.doctor);
  //       console.log("data2", data2);
  //     };

  //     fetchData();

  //     // Cleanup function (optional)
  //     return () => {
  //       // Perform cleanup if needed
  //     };
  //   }, [id]) // Depend on the id or any other variable that may change
  // );

  if (isLoading) {
    return <Text>IS LOADING</Text>;
  }
  if (error) {
    return <Text>Something happend</Text>;
  }
  const hospital = data.hospital;

  // const [showFullDescription, setShowFullDescription] = useState(false);
  // const toggleDescription = () => {
  //   setShowFullDescription(!showFullDescription);
  // };

  const renderDoctorItem = ({ item }) => (
    <View style={styles.doctorCard}>
      <Image source={{ uri: item.value.photo }} style={styles.doctorImage} />
      <View style={styles.doctorData}>
        <Text style={styles.doctorName}>{item.value.firstName}</Text>
        <Text style={styles.doctorSpecialty}>{item.value.specialization}</Text>
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
      <Image source={{ uri: hospital.photo }} style={styles.image} />
      <View style={styles.overlayContainer}>
        <View style={styles.hospitalCard}>
          <Text style={styles.hospitalTitle}>{hospital.name}</Text>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Icon name="location-on" size={15} color="#C276F0" />
              <Text style={styles.addressText}>{hospital.address}</Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.visitGalleryButtonText}>Visit Gallery</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={hospital.doctors}
            keyExtractor={(doctorId) => doctorId}
            renderItem={({ item: doctorId }) => {
              const {
                data: doctorData,
                isLoading: doctorLoading,
                error: doctorError,
              } = useDoctorQuery(doctorId);
              console.log("doctorData", doctorData);

              if (doctorLoading) {
                return <Text>Loading doctor...</Text>;
              }

              if (doctorError) {
                return <Text>Error loading doctor data</Text>;
              }

              return renderDoctorItem({ item: doctorData });
            }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ flex: 1 }}
                >
                  {/* <Text style={styles.descriptionText}>
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
                  </Text>*/}
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
