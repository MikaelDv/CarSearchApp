import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { colors, radius, spacing, typography } from "../theme";

const VARIANTS = {
  primary: colors.primary,
  secondary: colors.surfaceAlt,
  success: colors.success,
};

export default function Button({
  title,
  icon,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  style,
}) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: VARIANTS[variant] },
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={18} color={colors.text} />}
          {title && <Text style={styles.text}>{title}</Text>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    elevation: 3,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    ...typography.button,
  },
});
