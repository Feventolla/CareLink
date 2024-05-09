import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const FilterPage = ({ applyFilters }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const serviceData = [
    "Radiolgy",
    "Maternity",
    "Cardiology",
    "Laboratory",
    "Emergency",
    "Physiotherapy",
    "sergury",
  ];

  const toggleService = (service) => {
    const updatedServices = selectedServices.includes(service)
      ? selectedServices.filter((item) => item !== service)
      : [...selectedServices, service];

    setSelectedServices(updatedServices);
  };

  const handleApplyFilters = () => {
    applyFilters(selectedServices);
  };


  return (
    <View style={styles.container}>
      <View style={styles.filterTitle}>
        <Text style={styles.title}>Medical Service</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {serviceData.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.serviceItem,
              selectedServices.includes(service) && styles.selectedService,
            ]}
            onPress={() => toggleService(service)}
          >
            <Text
              style={[
                styles.serviceText,
                selectedServices.includes(service) &&
                  styles.selectedServiceText,
              ]}
            >
              {service}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleApplyFilters}>
        <Text style={styles.applyFilterButton}>Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 16,
  },
  serviceItem: {
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    marginRight: 10,
    height: 40,
  },
  selectedService: {
    backgroundColor: "#C276F0",
    color: "#FFFFFF",
  },
  serviceText: {
    fontWeight: "bold",
  },
  selectedServiceText: {
    color: "white",
  },
  applyFilterButton: {
    color: "#C276F0",
    paddingTop: 8,
    paddingLeft: 4,
    alignSelf: "flex-end",
  },
});

export default FilterPage;
