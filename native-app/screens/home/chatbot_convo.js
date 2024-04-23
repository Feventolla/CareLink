import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/MaterialIcons";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const userId = "user1"; // Unique identifier for the user (manage this appropriately)

  const handleSend = async () => {
    if (inputText.trim() === "") {
      return;
    }

    const newMessage = {
      _id: messages.length + 1,
      text: inputText,
      createdAt: new Date(),
      user: { _id: 1, name: "User" },
    };

    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, [newMessage])
    );
    setInputText("");

    fetch("http://192.168.0.167:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: inputText,
        user_id: userId, // Include user_id if your server handles sessions or user-specific data
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Check if 'messages' is defined and is an array
        if (data.response && Array.isArray(data.response)) {
          const botMessages = data.response.map((text, index) => ({
            _id: text.length + 2 + index,
            text: text,
            createdAt: new Date(),
            user: { _id: 2, name: "CareLink Bot" },
          }));
          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, botMessages)
          );
        } else {
          console.log("No messages received:", data);
          // Handle no messages or unexpected data format
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        // Optionally handle errors or show an error message to the user here
      });
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: 1, name: "User" }}
        renderInputToolbar={() => (
          <View style={styles.inputToolbar}>
            <TextInput
              style={styles.textInput}
              placeholder="Type how you feel..."
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
  },
  inputToolbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
    backgroundColor: "#C276F0",
    height: 50,
    width: 60,
    textAlign: "center",
    verticalAlign: "middle",
    borderRadius: 15,
  },
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
