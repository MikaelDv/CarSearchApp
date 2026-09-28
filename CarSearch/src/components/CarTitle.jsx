import { StyleSheet, Text, View } from "react-native";

import { spacing, typography } from "../theme";

export default function CarTitle({ marca, modelo, versao, compact }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.brand, compact && styles.brandCompact]}>
        {marca?.toUpperCase()}
      </Text>
      <Text style={[styles.model, compact && styles.modelCompact]}>
        {modelo?.toUpperCase()} {versao?.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  brand: {
    ...typography.overline,
  },
  brandCompact: {
    fontSize: 13,
    letterSpacing: 1,
  },
  model: {
    ...typography.title,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  modelCompact: {
    fontSize: 16,
  },
});
