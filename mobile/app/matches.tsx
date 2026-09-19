import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function MatchesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Matches</Text>
        <Text style={styles.subtitle}>Your mutual matches and conversations will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 24 },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 10 },
  subtitle: { fontSize: 17, opacity: 0.6 }
});
