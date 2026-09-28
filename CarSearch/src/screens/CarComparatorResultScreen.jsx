import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import Screen from "../components/Screen";
import BrandHeader from "../components/BrandHeader";
import CarTitle from "../components/CarTitle";
import Card from "../components/Card";
import Button from "../components/Button";
import { colors, radius, spacing, typography } from "../theme";

export default function CarComparatorResultScreen({ navigation }) {
  const route = useRoute();
  const { carros, resultado } = route.params || {};

  const lista =
    resultado && typeof resultado === "object"
      ? Object.values(resultado).map((value) => `${value}`)
      : [];

  return (
    <Screen>
      <BrandHeader />

      <View style={styles.header}>
        <View style={styles.carView}>
          <CarTitle
            compact
            marca={carros?.marca}
            modelo={carros?.modelo}
            versao={carros?.versao}
          />
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={styles.carView}>
          <CarTitle
            compact
            marca={carros?.marca2}
            modelo={carros?.modelo2}
            versao={carros?.versao2}
          />
        </View>
      </View>

      <Card title="Resultados da comparação">
        {lista.length === 0 && (
          <Text style={styles.empty}>Nenhum resultado retornado.</Text>
        )}
        {lista.map((item, index) => (
          <View style={styles.obsCard} key={index}>
            <View style={styles.obsBadge}>
              <Text style={styles.obsBadgeText}>{index + 1}</Text>
            </View>
            <View style={styles.obsItem}>
              <Text style={styles.obsItemText}>{item}</Text>
            </View>
          </View>
        ))}
      </Card>

      <View style={styles.flowControl}>
        <Button
          title="Voltar"
          variant="secondary"
          onPress={() => navigation.goBack()}
          style={styles.flex}
        />
        <Button
          title="Nova Comparação"
          onPress={() => navigation.popToTop()}
          style={styles.flex}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  carView: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  vs: {
    ...typography.overline,
    marginHorizontal: spacing.sm,
  },
  empty: {
    ...typography.caption,
    textAlign: "center",
  },
  obsCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  obsBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  obsBadgeText: {
    ...typography.button,
    fontSize: 14,
  },
  obsItem: {
    flex: 1,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radius.md,
    backgroundColor: colors.background,
  },
  obsItemText: {
    ...typography.body,
    lineHeight: 20,
  },
  flowControl: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  flex: {
    flex: 1,
  },
});
