import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FilterPage from "./FilterHospitals";
import { useGetHospitalsQuery } from "../../services/Hospital/hospital-api";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const gap = 10;
const availableSpace = screenWidth - (numColumns - 1) * gap;
const itemSize = availableSpace / numColumns;

const HospitalListPage = ({ navigation }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    services: [],
    experience: null,
  });
  const { data, isLoading, error } = useGetHospitalsQuery({});
  // const hospitals = hospitalData.value;
  // console.log("data", data);

  const applyFilters = (selectedServices, selectedExperience) => {
    setAppliedFilters({
      services: selectedServices,
      experience: selectedExperience,
    });
  };

  if (isLoading) {
    return <Text>IS LOADING</Text>;
  }
  if (error) {
    return <Text>something is wrong</Text>;
  }

  const hospitals = data.value;
  // console.log("******************", hospitals);
  const filteredHospitals = useMemo(() => {
    let filteredList = hospitals;

    if (appliedFilters.services.length > 0) {
      filteredList = filteredList.filter((hospital) => {
        // Check if all selected services are present in the hospital's services array
        return appliedFilters.services.every((selectedService) =>
          hospital.services.includes(selectedService)
        );
      });
    }

    // if (appliedFilters.experience !== null) {
    //   if (appliedFilters.experience === ">10") {
    //     let experience = 10;
    //   } else {
    //     experience = parseInt(appliedFilters.experience);
    //   }
    //   filteredList = filteredList.filter(
    //     (hospital) => hospital.medicalExperience >= experience
    //   );
    // }

    return filteredList;
  }, [hospitals, appliedFilters]);

  const openFilter = () => {
    setShowFilter(!showFilter);
  };


  const filteredHospitalsWithSearch = filteredHospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <ScrollView
      onPress={() => {
        navigation.navigate("Hospital_detail", {
          id: item._id,
        });
      }}
    >
      <View style={styles.hospitalCard}>
        <Image source={{ uri: item.photo }} style={styles.hospitalImage} />
        <View style={styles.hospitalInfo}>
          <Text style={styles.hospitalTitle}>{item.name}</Text>
          <Text style={styles.hospitalDescription}>
            {item.description.slice(0, 80)}...
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Hospital_detail", {
                id: item._id,
              });
            }}
          >
            <Text style={styles.readMoreButton}>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Healthcare-facilities </Text>
        <TouchableOpacity style={styles.filterButton} onPress={openFilter}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>
      {showFilter && <FilterPage applyFilters={applyFilters} />}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Icon name="search" size={21} color="#C276F0" />
        </TouchableOpacity>
      </View>

      <FlatList
        columnWrapperStyle={{ gap }}
        data={filteredHospitalsWithSearch}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        numColumns={2}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
    justifyContent: "space-between",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    color: "#363853",
    fontWeight: "bold",
  },
  searchIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  filterButton: {
    borderRadius: 8,
    alignItems: "flex-end",
  },
  filterButtonText: {
    color: "#C276F0",
  },
  searchBar: {
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#C276F0",
    borderRadius: 8,
    padding: 8,
  },
  hospitalCard: {
    maxWidth: itemSize,
    flex: 1,
    marginBottom: 10,
    flexDirection: "column",
    borderRadius: 8,
    justifyContent: "space-between",
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  hospitalImage: {
    width: "100%",
    height: 130,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  hospitalInfo: {
    padding: 8,
    color: "#4F4F4F",
  },
  hospitalTitle: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "bold",
  },
  hospitalDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  readMoreButton: {
    color: "#C276F0",
  },
  filter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeFilterButton: {
    color: "white",
  },
};

export default HospitalListPage;
