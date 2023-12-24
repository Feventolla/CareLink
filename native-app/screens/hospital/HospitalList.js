import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import FilterPage from "./FilterHospitals";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const gap = 10;
const availableSpace = screenWidth - (numColumns - 1) * gap;
const itemSize = availableSpace / numColumns;

const HospitalListPage = ({ navigation }) => {
  const [showFilter, setShowFilter] = useState(false);
  // const navigation = useNavigation();
  const navigateToHospitalDetail = (hospitalId) => {
    navigation.navigate("Hospital_detail");
  };

  const openFilter = () => {
    setShowFilter(!showFilter);
  };

  const hospitalsData = [
    {
      id: "1",
      title: "Hospital 1",
      description: "Lorem ipsum dolor sit am pharetra scelerisque ",
      imageUrl: require("../../assets/images/hospital/hospital.png"),
    },
    {
      id: "2",
      title: "Hospital 2",
      description: "Lorem ipsum dolor sit am pharetra scelerisque",
      imageUrl: require("../../assets/images/hospital/hos1.jpeg"),
    },
    {
      id: "3",
      title: "Hospital 1",
      description: "Lorem ipsum dolor sit am pharetra scelerisque",
      imageUrl: require("../../assets/images/hospital/hos2.jpeg"),
    },
    {
      id: "4",
      title: "Hospital 2",
      description: "Short description for Hospital 2",
      imageUrl: require("../../assets/images/hospital/hos3.jpeg"),
    },
    {
      id: "5",
      title: "Hospital 1",
      description: "Short description for Hospital 1",
      imageUrl: require("../../assets/images/hospital/hos1.jpeg"),
    },
    {
      id: "6",
      title: "Hospital 2",
      description: "Short description for Hospital 2",
      imageUrl: require("../../assets/images/hospital/hos2.jpeg"),
    },
  ];

  const renderItem = ({ item }) => (
    <ScrollView onPress={() => navigateToHospitalDetail(item.id)}>
      <View style={styles.hospitalCard}>
        <Image source={item.imageUrl} style={styles.hospitalImage} />
        <View style={styles.hospitalInfo}>
          <Text style={styles.hospitalTitle}>{item.title}</Text>
          <Text style={styles.hospitalDescription}>
            {item.description.slice(0, 150)}...
          </Text>
          <TouchableOpacity onPress={() => navigateToHospitalDetail(item.id)}>
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
      {showFilter && <FilterPage />}
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <TouchableOpacity style={styles.searchIcon}>
          <Icon name="search" size={21} color="#C276F0" />
        </TouchableOpacity>
      </View>

      <FlatList
        columnWrapperStyle={{ gap }}
        data={hospitalsData}
        keyExtractor={(item) => item.id}
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
