import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MIN_DISTANCE = 1;
const MAX_DISTANCE = 300;
const FILTERS_STORAGE_KEY = "vinge_filters";

type FilterKey = "gender" | "smoking" | "drinking";

const filterOptions: Record<FilterKey, string[]> = {
  gender: ["Male", "Female", "Non-binary", "Everyone"],
  smoking: ["Never", "Sometimes", "Regularly", "No preference"],
  drinking: ["Never", "Socially", "Often", "No preference"]
};

export default function FiltersScreen() {
  const [distance, setDistance] = useState(25);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [gender, setGender] = useState("Everyone");
  const [smoking, setSmoking] = useState("No preference");
  const [drinking, setDrinking] = useState("No preference");
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);

  useEffect(() => {
    const loadFilters = async () => {
      const [{ status }, saved] = await Promise.all([
        Location.getForegroundPermissionsAsync(),
        AsyncStorage.getItem(FILTERS_STORAGE_KEY)
      ]);

      setLocationAllowed(status === "granted");

      if (saved) {
        const filters = JSON.parse(saved);
        if (typeof filters.distance === "number") setDistance(filters.distance);
        if (typeof filters.gender === "string") setGender(filters.gender);
        if (typeof filters.smoking === "string") setSmoking(filters.smoking);
        if (typeof filters.drinking === "string") setDrinking(filters.drinking);
      }
    };

    loadFilters().catch(() => {
      Alert.alert("Unable to load filters", "Please try again.");
    });
  }, []);

  const enableLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const granted = status === "granted";
    setLocationAllowed(granted);
    if (!granted) {
      Alert.alert("Location required", "Vinge needs location access to match you with people within your selected distance.");
    }
  };

  const selectedValue = (key: FilterKey) => {
    if (key === "gender") return gender;
    if (key === "smoking") return smoking;
    return drinking;
  };

  const selectOption = (key: FilterKey, value: string) => {
    if (key === "gender") setGender(value);
    if (key === "smoking") setSmoking(value);
    if (key === "drinking") setDrinking(value);
    setActiveFilter(null);
  };

  const saveFilters = async () => {
    if (!locationAllowed) {
      await enableLocation();
      return;
    }
    await AsyncStorage.setItem(
      FILTERS_STORAGE_KEY,
      JSON.stringify({ distance, gender, smoking, drinking })
    );
    router.back();
  };

  const preferenceRow = (label: string, key: FilterKey) => (
    <TouchableOpacity style={styles.preferenceRow} onPress={() => setActiveFilter(key)} activeOpacity={0.7}>
      <Text style={styles.preferenceLabel}>{label}</Text>
      <View style={styles.preferenceValueGroup}>
        <Text style={styles.preferenceValue}>{selectedValue(key)}</Text>
        <Ionicons name="chevron-down" size={18} color="#777" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="close" size={27} color="#111" />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <View style={styles.iconButton} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.preferences}>
          {preferenceRow("Gender", "gender")}
          {preferenceRow("Smoking", "smoking")}
          {preferenceRow("Drinking", "drinking")}
        </View>

        <View style={styles.distanceSection}>
          <View style={styles.row}>
            <View style={styles.labelGroup}>
              <Text style={styles.sectionTitle}>Distance</Text>
              <Text style={styles.required}>Location required</Text>
            </View>
            <Text style={styles.distanceValue}>{distance} mi</Text>
          </View>

          <Text style={styles.description}>
            Choose how far away your potential matches can be. You can search up to 300 miles.
          </Text>

          {!locationAllowed ? (
            <TouchableOpacity style={styles.locationButton} onPress={enableLocation}>
              <Ionicons name="location-outline" size={21} color="#111" />
              <Text style={styles.locationText}>Allow location</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.locationReady}>
              <Ionicons name="checkmark-circle" size={20} color="#111" />
              <Text style={styles.locationReadyText}>Location enabled</Text>
            </View>
          )}

          <Slider
            style={styles.slider}
            minimumValue={MIN_DISTANCE}
            maximumValue={MAX_DISTANCE}
            step={1}
            value={distance}
            onValueChange={setDistance}
            disabled={!locationAllowed}
            minimumTrackTintColor="#111"
            maximumTrackTintColor="#d8d8d8"
            thumbTintColor="#111"
          />

          <View style={styles.rangeLabels}>
            <Text style={styles.rangeText}>1 mi</Text>
            <Text style={styles.rangeText}>300 mi</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={saveFilters}>
        <Text style={styles.saveText}>SAVE FILTERS</Text>
      </TouchableOpacity>

      <Modal visible={activeFilter !== null} transparent animationType="fade" onRequestClose={() => setActiveFilter(null)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setActiveFilter(null)}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownTitle}>
              {activeFilter ? activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1) : ""}
            </Text>
            {activeFilter &&
              filterOptions[activeFilter].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.option}
                  onPress={() => selectOption(activeFilter, option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                  {selectedValue(activeFilter) === option && (
                    <Ionicons name="checkmark" size={20} color="#111" />
                  )}
                </TouchableOpacity>
              ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#eee" },
  iconButton: { width: 42, height: 42, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "800" },
  content: { padding: 24, paddingBottom: 20 },
  preferences: { borderTopWidth: 1, borderTopColor: "#eee" },
  preferenceRow: { minHeight: 64, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#eee" },
  preferenceLabel: { fontSize: 17, fontWeight: "700" },
  preferenceValueGroup: { flexDirection: "row", alignItems: "center", gap: 7 },
  preferenceValue: { fontSize: 16, color: "#555" },
  distanceSection: { marginTop: 34 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  labelGroup: { gap: 5 },
  sectionTitle: { fontSize: 24, fontWeight: "800" },
  required: { fontSize: 13, fontWeight: "700", color: "#666" },
  distanceValue: { fontSize: 22, fontWeight: "800" },
  description: { marginTop: 14, fontSize: 16, lineHeight: 23, color: "#666" },
  locationButton: { marginTop: 24, flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#ddd", borderRadius: 14, padding: 15 },
  locationText: { fontSize: 16, fontWeight: "700" },
  locationReady: { marginTop: 24, flexDirection: "row", gap: 7, alignItems: "center" },
  locationReadyText: { fontSize: 15, fontWeight: "600" },
  slider: { width: "100%", height: 48, marginTop: 26 },
  rangeLabels: { flexDirection: "row", justifyContent: "space-between" },
  rangeText: { fontSize: 13, color: "#777" },
  saveButton: { marginHorizontal: 24, marginTop: 8, marginBottom: 24, backgroundColor: "#111", borderRadius: 16, padding: 18, alignItems: "center" },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "800" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.25)", justifyContent: "center", padding: 28 },
  dropdown: { backgroundColor: "#fff", borderRadius: 18, padding: 18 },
  dropdownTitle: { fontSize: 20, fontWeight: "800", marginBottom: 8 },
  option: { minHeight: 52, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#eee" },
  optionText: { fontSize: 16 }
});
