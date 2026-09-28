import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";

import Screen from "../components/Screen";
import BrandHeader from "../components/BrandHeader";
import CarTitle from "../components/CarTitle";
import Card from "../components/Card";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { buscarCarro } from "../service/CarService";
import { notify } from "../utils/notify";
import { colors, radius, spacing, typography } from "../theme";

export default function SpecScreen({ navigation }) {
  const route = useRoute();

  const [especificacao, setEspecificacao] = useState("");
  const [especificacoesList, setEspecificacoesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { marca, modelo, versao } = route.params;

  const addEspcList = () => {
    if (!especificacao.trim()) return;

    setEspecificacoesList((prev) => [...prev, especificacao.trim()]);
    setEspecificacao("");
  };

  const removeItem = (indexToRemove) => {
    setEspecificacoesList((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleBuscar = async () => {
    setLoading(true);

    const carro = {
      marca,
      modelo,
      versao,
      especificacoes: especificacoesList,
    };

    try {
      const resultado = await buscarCarro(carro);
      navigation.navigate("Result", { resultado });
    } catch (error) {
      console.log("erro", error);
      notify("Erro ao buscar veículo", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <BrandHeader />
      <View style={styles.header}>
        <CarTitle marca={marca} modelo={modelo} versao={versao} />
      </View>

      <Card title="Adicionar especificações">
        <View style={styles.row}>
          <TextField
            style={styles.input}
            placeholder="Ex: motor, consumo, potência..."
            value={especificacao}
            onChangeText={setEspecificacao}
            onSubmitEditing={addEspcList}
            returnKeyType="done"
          />
          <Button icon="add" variant="success" onPress={addEspcList} />
        </View>

        <View style={styles.chipList}>
          {especificacoesList.map((item, index) => (
            <TouchableOpacity
              key={`${item}-${index}`}
              onPress={() => removeItem(index)}
              style={styles.chip}
            >
              <Text style={styles.chipText}>{item}</Text>
              <Ionicons name="close" size={14} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.hint}>
          {especificacoesList.length === 0
            ? "Nenhuma especificação adicionada — a busca trará as principais."
            : "Toque em uma especificação para removê-la."}
        </Text>
      </Card>

      <View style={styles.flowControl}>
        <Button
          title="Voltar"
          variant="secondary"
          onPress={() => navigation.goBack()}
          style={styles.flex}
        />
        <Button
          title="Buscar"
          icon="search"
          onPress={handleBuscar}
          loading={loading}
          style={styles.flex}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: -spacing.md,
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chipList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surfaceAlt,
    paddingVertical: spacing.sm,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
  },
  chipText: {
    ...typography.body,
  },
  hint: {
    ...typography.caption,
    textAlign: "center",
    marginTop: spacing.md,
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
