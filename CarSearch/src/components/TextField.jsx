import { StyleSheet, TextInput } from "react-native";

import { colors, radius, spacing } from "../theme";

export default function TextField({ style, ...props }) {
  return (
    <TextInput
      placeholderTextColor={colors.textMuted}
      style={[styles.input, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 15,
  },
});
