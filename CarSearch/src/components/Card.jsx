import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "../theme";

export default function Card({ title, children, style }) {
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  title: {
    ...typography.section,
    textAlign: "center",
    marginBottom: spacing.md,
  },
});
