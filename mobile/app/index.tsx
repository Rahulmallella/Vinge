import { Link } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>Vinge</Text>
        <Text style={styles.title}>Meet someone right now.</Text>
        <Text style={styles.subtitle}>
          Set your preferences, get paired, and start a two-minute video date.
        </Text>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>Your Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryText}>START MATCHING</Text>
        </TouchableOpacity>

        <Text style={styles.or}>or</Text>

        <TouchableOpacity style={styles.browseButton}>
          <Text style={styles.browseText}>Browse Profiles →</Text>
        </TouchableOpacity>

        <View style={styles.nav}>
          <Text style={styles.activeNav}>Discover</Text>
          <Link href="/matches" style={styles.navText}>Matches</Link>
          <Link href="/profile" style={styles.navText}>Profile</Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, padding: 24, justifyContent: "center" },
  logo: { fontSize: 36, fontWeight: "800", marginBottom: 48 },
  title: { fontSize: 30, fontWeight: "700", marginBottom: 12 },
  subtitle: { fontSize: 17, lineHeight: 25, opacity: 0.65, marginBottom: 36 },
  secondaryButton: { borderWidth: 1, borderRadius: 16, padding: 17, alignItems: "center", marginBottom: 14 },
  secondaryText: { fontSize: 16, fontWeight: "600" },
  primaryButton: { backgroundColor: "#111", borderRadius: 16, padding: 19, alignItems: "center" },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "800" },
  or: { textAlign: "center", marginVertical: 20, opacity: 0.45 },
  browseButton: { alignItems: "center", padding: 12 },
  browseText: { fontSize: 16, fontWeight: "600" },
  nav: { position: "absolute", bottom: 18, left: 24, right: 24, flexDirection: "row", justifyContent: "space-around" },
  activeNav: { fontWeight: "800", fontSize: 15 },
  navText: { fontSize: 15, opacity: 0.55 }
});
