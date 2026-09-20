import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MIN_DISTANCE = 1;
const MAX_DISTANCE = 300;

export default function FiltersScreen() {
  const [distance, setDistance] = useState(25);
  const [locationAllowed, setLocationAllowed] = useState(false);

  useEffect(() => {
    Location.getForegroundPermissionsAsync().then(({ status }) => setLocationAllowed(status === "granted"));
  }, []);

  const enableLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const granted = status === "granted";
    setLocationAllowed(granted);
    if (!granted) {
      Alert.alert("Location required", "Vinge needs location access to match you with people within your selected distance.");
    }
  };

  const saveFilters = async () => {
    if (!locationAllowed) {
      await enableLocation();
      return;
    }
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="close" size={27} color="#111" />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <View style={styles.iconButton} />
      </View>

      <View style={styles.content}>
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

        {!locationAllowed && (
          <TouchableOpacity style={styles.locationButton} onPress={enableLocation}>
            <Ionicons name="location-outline" size={21} color="#111" />
            <Text style={styles.locationText}>Allow location</Text>
          </TouchableOpacity>
        )}

        {locationAllowed && (
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

        <Text style={styles.helper}>
          {locationAllowed ? "Drag the bar to set your matching radius." : "Allow location to choose your matching radius."}
        </Text>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveFilters}>
        <Text style={styles.saveText}>SAVE FILTERS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#eee" },
  iconButton: { width: 42, height: 42, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "800" },
  content: { flex: 1, padding: 24 },
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
  helper: { marginTop: 16, fontSize: 14, color: "#777" },
  saveButton: { margin: 24, backgroundColor: "#111", borderRadius: 16, padding: 18, alignItems: "center" },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "800" }
});
