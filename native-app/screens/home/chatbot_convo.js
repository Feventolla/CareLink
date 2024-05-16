import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  Image, // Import ScrollView for horizontal rows
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/MaterialIcons";
import LanguageDropdown from "../common/langButton";
import { useSelector } from "react-redux";
import { useGetNearbyHospitalsQuery } from "../../services/Hospital/hospital-api";
import * as Location from "expo-location";

const SymptomBox = ({ symptom, onPress }) => (
  <TouchableOpacity style={styles.symptomBox} onPress={() => onPress(symptom)}>
    <Text style={styles.symptomText}>{symptom}</Text>
  </TouchableOpacity>
);

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const currentLanguage = useSelector((state) => state.auth.language);
  const [hospitalData, setHospitalData] = useState(null);
  const userId = "user1";

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayDistance, setDisplayDistance] = useState(true);
  const { data, isLoading, error, isSuccess } = useGetNearbyHospitalsQuery(
    {
      longitude,
      latitude,
    },
    { skip: loading }
  );
  const DEFAULT_LOCATION = {
    latitude: "40.7128",
    longitude: "-74.006",
  };

  const API_ENDPOINTS = {
    en: {
      symptoms: "http://192.168.60.37:8000/symptoms",
      chat: "http://192.168.60.37:8000/chat",
    },
    am: {
      symptoms: "http://192.168.60.37:5000/symptoms",
      chat: "http://192.168.60.37:5000/conversation",
    },
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLongitude(DEFAULT_LOCATION.longitude);
        setLatitude(DEFAULT_LOCATION.latitude);
        setDisplayDistance(false);
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

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const endpoint =
          currentLanguage.language === "en"
            ? API_ENDPOINTS.en.symptoms
            : API_ENDPOINTS.am.symptoms;
        const response = await fetch(endpoint);
        const data = await response.json();
        setSymptoms(data);
      } catch (error) {
        console.error("Failed to load symptoms:", error);
      }
    };
    setMessages([]);
    setHospitalData(null);
    fetchSymptoms();
  }, [currentLanguage]);

  const handleSymptomPress = (symptom) => {
    setInputText((prevText) => `${prevText}${prevText ? ", " : ""}${symptom}`);
  };

  const handleSend = async () => {
    if (inputText.trim() === "") {
      return;
    }

    const newMessage = {
      _id: Date.now(),
      text: inputText,
      createdAt: new Date(),
      user: { _id: 1, name: "User" },
    };

    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, [newMessage])
    );
    setInputText("");

    const endpoint =
      currentLanguage.language === "en"
        ? API_ENDPOINTS.en.chat
        : API_ENDPOINTS.am.chat;

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: inputText, user_id: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response && Array.isArray(data.response)) {
          const botMessages = data.response.map((text, index) => ({
            _id: Date.now() + index,
            text: text,
            createdAt: new Date(),
            user: { _id: 2, name: "CareLink Bot" },
          }));
          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, botMessages)
          );

          if (data.disease) {
            fetch(
              `https://carelink.onrender.com/hospital/searchBySpepecialization?disease=${data.disease}&latitude=${latitude}&longitude=${longitude}`,
              {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              }
            )
              .then((response) => {
                if (response.status === 200) {
                  return response.json();
                } else {
                  throw new Error("Failed to retrieve hospitals");
                }
              })
              .then((data) => {
                console.log(
                  "Hospitals retrieved:",
                  data.value[0].hospitalId.name
                );
                setHospitalData(data.value); // Set the retrieved data to the state
              })
              .catch((error) => {
                console.error("Error sending disease data:", error);
              });
          }

          if (!hospitalData) {
            return null; // Return null or a loading indicator while waiting for the data
          }
        } else {
          console.log("No messages received:", data);
        }
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  // Divide symptoms into three rows
  const rowDivision = Math.ceil(symptoms.length / 3);
  const rows = [
    symptoms.slice(0, rowDivision),
    symptoms.slice(rowDivision, 2 * rowDivision),
    symptoms.slice(2 * rowDivision),
  ];

  const renderItem = ({ item }) => (
    <ScrollView
      onPress={() => {
        navigation.navigate("Hospital_detail", {
          id: item._id,
        });
      }}
    >
      <View style={styles.hospitalCard}>
        <Image
          source={{ uri: item.hospitalId.photo }}
          style={styles.hospitalImage}
        />
        <View style={styles.hospitalInfo}>
          <Text style={styles.hospitalTitle}>
            {currentLanguage.language === "en"
              ? item.hospitalId.name
              : item.hospitalId.amhName}
          </Text>
          <Text style={styles.hospitalDescription}>
            {currentLanguage.language === "en"
              ? "they specialize on mainly " +
                item.hospitalId.generalSpecialization
              : item.hospitalId.amhGeneralSpecialization}
            ...
          </Text>
          <Text style={styles.hospitalDescription}>
            "they have services like "+{item.hospitalId.services[(0, 4)]}
          </Text>
          {/* <Text style={styles.hospitalDescription}>
            {currentLanguage.language === "en"
              ? item.hospitalId.description.slice(0, 80)
              : item.hospitalId.amhDescription.slice(0, 80)}
            ...
          </Text> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Hospital_detail", {
                id: item.hospitalId._id,
              });
            }}
          >
            <Text style={styles.readMoreButton}>
              {currentLanguage.language === "en" ? "Read More" : "ተጨማሪ ያንብቡ"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
  // if (hospitalData) ()=>{
  //   const hospitals = hospitalData.value;
  // };
  return (
    <View style={styles.fullcontainer}>
      <ImageBackground
        source={require("../../assets/chat_back2.jpeg")} // Replace with the actual image path
        style={styles.backgroundImage}
      >
        <LanguageDropdown top={0} />
        <View style={styles.symptomsContainer}>
          <Text style={styles.symptomtext}>
            {currentLanguage.language === "en"
              ? "symptom options here"
              : "የበሽታ ምልክቶች አማራጭ"}
          </Text>
          {rows.map((row, index) => (
            <ScrollView
              key={index}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.symptomRow}
              // style={styles.symptomRow}
            >
              {row.map((symptom, idx) => (
                <SymptomBox
                  key={idx}
                  symptom={symptom}
                  onPress={() => handleSymptomPress(symptom)}
                />
              ))}
            </ScrollView>
          ))}
          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {symptoms.map((symptom, index) => (
            <SymptomBox
              key={index}
              symptom={symptom}
              onPress={handleSymptomPress}
            />
          ))}
        </ScrollView> */}
        </View>
        {hospitalData && (
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => setHospitalData(null)}
          >
            <Text style={styles.emptyButtonText}>Clear Hospital Data</Text>
          </TouchableOpacity>
        )}
        {hospitalData && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container_card}
          >
            {hospitalData.map((hospital) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  console.log(`Card ${hospital.hospitalId._id} pressed`)
                }
                key={hospital.hospitalId._id}
              >
                <Image
                  source={{ uri: hospital.hospitalId.photo }}
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>
                    {currentLanguage.language === "en"
                      ? hospital.hospitalId.name
                      : hospital.hospitalId.amhName}
                  </Text>
                  <Text style={styles.hospitalDescription}>
                    {currentLanguage.language === "en"
                      ? "they specialize on mainly " +
                        hospital.hospitalId.generalSpecialization
                      : hospital.hospitalId.amhGeneralSpecialization}
                    ...
                  </Text>
                  <Text style={styles.hospitalDescription}>
                    They have services like:{" "}
                    {hospital.hospitalId.services
                      .slice(0, 4)
                      .map((service, index) => (
                        <Text key={index}>
                          {service}
                          {index !== 3 ? ", " : ""}
                        </Text>
                      ))}
                    {hospital.hospitalId.services.length > 4 && " and more."}
                  </Text>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                      navigation.navigate("Hospital_detail", {
                        id: hospital.hospitalId._id,
                      });
                      // handleDetailPage(hospital._id)
                    }}
                  >
                    <View style={styles.bottomContainer}>
                      {displayDistance && (
                        <Text style={styles.distance}>
                          {hospital.hospital.distance / 1000} km away
                        </Text>
                      )}

                      <Text style={styles.actionButtonText}>
                        {currentLanguage.language === "en"
                          ? "Read More"
                          : "ተጨማሪ ያንብቡ"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        <View style={styles.container}>
          <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={{ _id: 1, name: "User" }}
            renderInputToolbar={() => (
              <View style={styles.inputToolbar}>
                <TextInput
                  style={styles.textInput}
                  placeholder={
                    currentLanguage.language === "en"
                      ? "Please use ',' while listing your symptoms..."
                      : "ምልክቶችዎን በሚዘረዝሩበት ጊዜ እባክዎ ',' ይጠቀሙ......"
                  }
                  value={inputText}
                  onChangeText={setInputText}
                />
                <TouchableOpacity
                  onPress={handleSend}
                  style={styles.sendButton}
                >
                  <Icon
                    name="send"
                    size={30}
                    color="white"
                    style={styles.searchIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  fullcontainer: {
    flex: 1,
    // backgroundColor: "#E0CCDB",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    // filter: "blur(10px)",

    // blurRadius: 10, // or 'stretch' if you prefer a different image resizing mode
  },
  symptomsContainer: {
    // position: "absolute",
    // top: 600,
    // bottom: 0,
    height: 150,
    // backgroundColor: "black", // Adjust the height as desired
  },
  container: {
    flex: 1,
    marginBottom: 40, // Adjust the margin as needed
  },
  inputToolbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  symptomtext: {
    color: "#9E51C9",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },

  textInput: {
    flex: 1,
    height: 60,
    borderRadius: 20,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  sendButton: {
    marginLeft: 10,
  },
  searchIcon: {
    backgroundColor: "#087F72",
    height: 50,
    width: 60,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 15,
  },
  container_card: {
    flexDirection: "row",
    padding: 16,
  },
  card: {
    width: 250,
    height: 300,
    marginRight: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  cardImage: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
    borderRadius: 20,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  actionButton: {
    padding: 10,
  },
  bottomContainer: {
    color: "#087F72",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButtonText: {
    color: "#087F72",
    fontWeight: "bold",
    textAlign: "right",
  },
  distance: {
    color: "#087F72",
    fontWeight: "bold",
  },
  emptyButtonText: {
    // backgroundColor: "#087F72",
    color: "#087F72",
    fontSize: 20,
    fontWeight: "bold",
    // marginRight: 40,
    // marginLeft: 40,
    // textAlign: "center",
  },

  symptomBox: {
    // backgroundColor: "#C276F0",
    borderWidth: 1,
    borderColor: "#C276F0",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  symptomText: {
    color: "black",
    fontSize: 15,
  },
  // symptomsContainer: {
  //   // position: "position",
  //   // top: 0,
  //   // bottom: 10,
  //   zIndex: 1,

  //   flexDirection: "row",

  //   flexWrap: "wrap",
  //   padding: 5,
  //   backgroundColor: "black", // Adds some padding around the content
  // },
});
export default ChatScreen;

// import React, { useState } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import Icon from "react-native-vector-icons/MaterialIcons";

// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
// } from "react-native";

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState("");

//   const handleSend = () => {
//     if (inputText.trim() === "") {
//       return;
//     }

//     const newMessage = {
//       _id: messages.length + 1,
//       text: inputText,
//       createdAt: new Date(),
//       user: { _id: 1, name: "User" },
//     };

//     setMessages((prevMessages) =>
//       GiftedChat.append(prevMessages, [newMessage])
//     );
//     setInputText("");

//     // Simulate bot response after a delay
//     setTimeout(() => {
//       const botResponse = {
//         _id: messages.length + 2,
//         text: "Hello! I am CareLink Bot.",
//         createdAt: new Date(),
//         user: { _id: 2, name: "CareLink Bot" },
//       };
//       setMessages((prevMessages) =>
//         GiftedChat.append(prevMessages, [botResponse])
//       );
//     }, 1000);
//   };

//   return (
//     <View style={styles.container}>
//       <GiftedChat
//         messages={messages}
//         onSend={handleSend}
//         user={{ _id: 1, name: "User" }}
//         renderInputToolbar={() => (
//           <View style={styles.inputToolbar}>
//             <TextInput
//               style={styles.textInput}
//               placeholder="Type how you feel..."
//               value={inputText}
//               onChangeText={(text) => setInputText(text)}
//             />
//             <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
//               <Icon
//                 name="send"
//                 size={30}
//                 color="white"
//                 style={styles.searchIcon}
//               />
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginBottom: 40, // Adjust the margin as needed
//   },
//   inputToolbar: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     // backgroundColor: "white",
//     // opacity: 100,
//   },
//   textInput: {
//     flex: 1,
//     height: 60,
//     // borderColor: "gray",
//     // borderWidth: 1,
//     borderRadius: 20,
//     paddingLeft: 10,
//     backgroundColor: "white",
//   },
//   sendButton: {
//     marginLeft: 10,
//   },
//   searchIcon: {
//     backgroundColor: "#C276F0",
//     height: 50,
//     width: 60,
//     textAlign: "center",
//     verticalAlign: "middle",
//     borderRadius: 15,
//   },
// });

// export default ChatScreen;
