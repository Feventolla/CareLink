import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const specialistsData = [
  "Cardiologist",
  "Dermatologist",
  "Orthopedic",
  "Pediatrician",
  "Ophthalmologist",
  "Neurologist",
  "Gastroenterologist",
  "Endocrinologist",
  // Add more specialists as needed
];
const medicalExperienceData = [
  "All",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ">10",
];

const FilterPage = () => {
  const [selectedSpecialists, setSelectedSpecialists] = useState([]);

  const toggleSpecialist = (specialist) => {
    if (selectedSpecialists.includes(specialist)) {
      setSelectedSpecialists(
        selectedSpecialists.filter((item) => item !== specialist)
      );
    } else {
      setSelectedSpecialists([...selectedSpecialists, specialist]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterTitle}>
        <Text style={styles.title}>Medical Specialist</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {specialistsData.map((specialist, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.specialistItem,
              selectedSpecialists.includes(specialist) &&
                styles.selectedSpecialist,
            ]}
            onPress={() => toggleSpecialist(specialist)}
          >
            <Text
              style={[
                styles.specialistText,
                selectedSpecialists.includes(specialist) &&
                  styles.selectedSpecialistText,
              ]}
            >
              {specialist}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.filterTitle}>
        <Text style={styles.title}>Medical Experience</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {medicalExperienceData.map((specialist, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.specialistItem,
              selectedSpecialists.includes(specialist) &&
                styles.selectedSpecialist,
            ]}
            onPress={() => toggleSpecialist(specialist)}
          >
            <Text
              style={[
                styles.specialistText,
                selectedSpecialists.includes(specialist) &&
                  styles.selectedSpecialistText,
              ]}
            >
              {specialist}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    // flex: 1,
    padding: 16,
    height: 200,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 16,
  },
  specialistItem: {
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    marginRight: 10,
    height: 40,
  },
  selectedSpecialist: {
    backgroundColor: "#C276F0",
    color: "#FFFFFF",
  },
  specialistText: {
    fontWeight: "bold",
  },
  selectedSpecialistText: {
    color: "white",
  },
});

export default FilterPage;
