import { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

import { useDoctorQuery } from "../../services/Doctors/doctor-api";

const DoctorItem = ({ item }) => {
  const { data: doctorData, isLoading, error } = useDoctorQuery(item);

  if (isLoading) {
    return <Text>IS LOADING</Text>;
  }

  if (error) {
    return <Text>Something happened</Text>;
  }

  const doctor = doctorData;

  return (
    <View style={styles.doctorCard}>
      <Image source={{ uri: doctor.value.photo }} style={styles.doctorImage} />
      <View style={styles.doctorData}>
        <Text style={styles.doctorName}>{doctor.value.firstName}</Text>
        <Text style={styles.doctorSpecialty}>
          {doctor.value.specialization}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  noDoctor: {
    color: "red",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
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
});
export default DoctorItem;
