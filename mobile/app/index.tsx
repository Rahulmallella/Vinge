import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Vinge</Text>

        <TouchableOpacity
          style={styles.filterButton}
          activeOpacity={0.7}
          onPress={() => {\n            Alert.alert("Filter tap detected", "Opening filters now.");\n            router.push("/filters");\n          }}
        >
          <Ionicons name="options-outline" size={22} color="#111" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Meet someone right now.</Text>
        <Text style={styles.subtitle}>
          Get paired with someone who matches your preferences and start a two-minute video date.
        </Text>

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
          <Text style={styles.primaryText}>START MATCHING</Text>
        </TouchableOpacity>

        <Text style={styles.or}>or</Text>

        <TouchableOpacity style={styles.browseButton} activeOpacity={0.7}>
          <Text style={styles.browseText}>Browse Profiles</Text>
          <Ionicons name="arrow-forward" size={18} color="#111" />
        </TouchableOpacity>
      </View>

      <View style={styles.nav}>
        <View style={styles.navItem}>
          <Ionicons name="compass" size={22} color="#111" />
          <Text style={styles.activeNav}>Discover</Text>
        </View>

        <Link href="/matches" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="heart-outline" size={22} color="#777" />
            <Text style={styles.navText}>Matches</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/profile" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person-outline" size={22} color="#777" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: { fontSize: 32, fontWeight: "800" },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  filterText: { fontSize: 15, fontWeight: "600" },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: "center", paddingBottom: 80 },
  title: { fontSize: 30, fontWeight: "700", marginBottom: 12 },
  subtitle: { fontSize: 17, lineHeight: 25, opacity: 0.65, marginBottom: 36 },
  primaryButton: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 19,
    alignItems: "center"
  },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "800" },
  or: { textAlign: "center", marginVertical: 20, opacity: 0.45 },
  browseButton: {
    flexDirection: "row",
    gap: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 12
  },
  browseText: { fontSize: 16, fontWeight: "600" },
  nav: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: { alignItems: "center", gap: 4, minWidth: 70 },
  activeNav: { fontWeight: "800", fontSize: 12 },
  navText: { fontSize: 12, color: "#777" }
});
