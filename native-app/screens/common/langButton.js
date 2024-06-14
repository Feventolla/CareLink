import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { setLanguage } from "../../services/Auth/auth_slice";

const LanguageDropdown = ({ top = 50, right = 20 }) => {
  const currentLanguage = useSelector((state) => state.auth.language);
  const dispatch = useDispatch();
  const toggleLanguage = () => {
    const newLanguage = currentLanguage.language === "en" ? "am" : "en";
    dispatch(setLanguage({ language: newLanguage }));
  };
  return (
    <View style={[styles.container, { top, right, zIndex: 1000 }]}>
      <TouchableOpacity onPress={toggleLanguage}>
        <Text style={styles.langButton}>
          {currentLanguage.language === "en" ? "Am" : "En"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#C276F0",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    zIndex: 1,
    marginTop: 15,
  },
  langButton: {
    textAlign: "right",
    color: "#ffffff",
  },
});

export default LanguageDropdown;
