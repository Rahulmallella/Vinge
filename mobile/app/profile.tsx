import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MIN_PHOTOS = 4;
const MAX_PHOTOS = 8;

export default function ProfileScreen() {
  const [photos, setPhotos] = useState<string[]>([]);

  const addPhoto = async () => {
    if (photos.length >= MAX_PHOTOS) {
      Alert.alert("Photo limit reached", "You can upload a maximum of 8 photos.");
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission needed", "Allow Vinge to access your photos to build your profile.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.9
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setPhotos((current) => [...current, result.assets[0].uri].slice(0, MAX_PHOTOS));
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((current) => current.filter((_, photoIndex) => photoIndex !== index));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Photos</Text>
            <Text style={styles.sectionSubtitle}>Add at least 4 photos. You can upload up to 8.</Text>
          </View>
          <Text style={[styles.counter, photos.length >= MIN_PHOTOS && styles.counterComplete]}>
            {photos.length}/{MAX_PHOTOS}
          </Text>
        </View>

        <View style={styles.progressRow}>
          <Ionicons
            name={photos.length >= MIN_PHOTOS ? "checkmark-circle" : "information-circle-outline"}
            size={18}
            color={photos.length >= MIN_PHOTOS ? "#111" : "#777"}
          />
          <Text style={styles.progressText}>
            {photos.length >= MIN_PHOTOS
              ? "Minimum photo requirement complete"
              : `${MIN_PHOTOS - photos.length} more photo${MIN_PHOTOS - photos.length === 1 ? "" : "s"} required`}
          </Text>
        </View>

        <View style={styles.grid}>
          {Array.from({ length: MAX_PHOTOS }).map((_, index) => {
            const photo = photos[index];

            return (
              <View key={index} style={styles.photoSlot}>
                {photo ? (
                  <>
                    <Image source={{ uri: photo }} style={styles.photo} />
                    <TouchableOpacity style={styles.removeButton} onPress={() => removePhoto(index)}>
                      <Ionicons name="close" size={17} color="#fff" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity style={styles.addButton} onPress={addPhoto} activeOpacity={0.7}>
                    <Ionicons name="add" size={30} color="#555" />
                    <Text style={styles.addText}>Add photo</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        <Text style={styles.hint}>
          Your first photo will be your main profile photo. Choose clear, recent photos of yourself.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 24, paddingBottom: 50 },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16
  },
  sectionTitle: { fontSize: 22, fontWeight: "700", marginBottom: 6 },
  sectionSubtitle: { fontSize: 15, lineHeight: 21, color: "#666", maxWidth: 275 },
  counter: { fontSize: 15, fontWeight: "700", color: "#777" },
  counterComplete: { color: "#111" },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 14,
    marginBottom: 20
  },
  progressText: { fontSize: 14, color: "#666" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  photoSlot: {
    width: "48%",
    aspectRatio: 0.8,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e7e7e7"
  },
  photo: { width: "100%", height: "100%" },
  addButton: { flex: 1, alignItems: "center", justifyContent: "center", gap: 7 },
  addText: { fontSize: 14, fontWeight: "600", color: "#555" },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center"
  },
  hint: { marginTop: 18, fontSize: 13, lineHeight: 19, color: "#777" }
});
