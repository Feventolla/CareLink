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
import { useDispatch, useSelector } from 'react-redux';

const DoctorItem = ({ item }) => {
  const { data: doctorData, isLoading, error } = useDoctorQuery(item);
  const currentLanguage = useSelector(state => state.auth.language);

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
        <Text style={styles.doctorName}>{currentLanguage.language === 'en' ? doctor.value.firstName : doctor.value.amhFirstName}</Text>
        <Text style={styles.doctorSpecialty}>
          {currentLanguage.language === 'en' ? doctor.value.specialization : doctor.value.amhSpecialization}
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
