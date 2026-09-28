import { Image, StyleSheet, Text, View } from "react-native";

import { spacing, typography } from "../theme";

export default function BrandHeader({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/fordLogo.png")}
        style={styles.logo}
      />
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.display,
    textAlign: "center",
  },
  subtitle: {
    ...typography.body,
    color: typography.caption.color,
    textAlign: "center",
    marginTop: spacing.xs,
  },
});
