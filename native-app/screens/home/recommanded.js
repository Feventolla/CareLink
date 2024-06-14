import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const RecommandedHospitalPage = ({ route, navigation }) => {
  const { hospitalData } = route.params;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.hospitalItem}
      onPress={() => {
        // Handle hospital item press if needed
      }}
    >
      <Text style={styles.hospitalName}>{item.name}</Text>
      <Text style={styles.hospitalDetails}>{item.address}</Text>
      <Text style={styles.hospitalDetails}>{item.phone}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hospitalData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  hospitalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hospitalDetails: {
    fontSize: 16,
    color: "#555",
  },
});

export default RecommandedHospitalPage;
