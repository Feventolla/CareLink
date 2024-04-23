import React, { useState, useEffect, useMemo } from "react";
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
import { useGetNearbyHospitalsQuery } from "../../services/Hospital/hospital-api";
import * as Location from "expo-location";

const DEFAULT_LOCATION = {
  latitude: "40.7128",
  longitude: "-74.006",
};

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
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [loading, setLoading] = useState(true);
  const { data, isLoading, error, isSuccess } = useGetNearbyHospitalsQuery(
    {
      longitude,
      latitude,
    },
    { skip: loading }
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLongitude(DEFAULT_LOCATION.longitude);
        setLatitude(DEFAULT_LOCATION.latitude);
      } else {
        try {
          let location = await Location.getCurrentPositionAsync({});
          setLongitude(location.coords.longitude);
          setLatitude(location.coords.latitude);
        } catch (error) {
          setLongitude(DEFAULT_LOCATION.longitude);
          setLatitude(DEFAULT_LOCATION.latitude);
        }
      }
      setLoading(false);
    })();
  }, []);

  const applyFilters = (selectedServices) => {
    setAppliedFilters({
      services: selectedServices,
    });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Something went wrong</Text>;
  }
  const hospitals = data.value;

  const filteredHospitals = hospitals.filter((hospital) => {
    if (appliedFilters.services.length === 0) return true;
    return appliedFilters.services.every((selectedService) =>
      hospital.services.includes(selectedService)
    );
  });

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
        style={styles.list}
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

  filterTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    // flex: 1,
    padding: 16,
    // height: 200,
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
  list: {
    marginBottom: 100,
  },
};

export default HospitalListPage;
