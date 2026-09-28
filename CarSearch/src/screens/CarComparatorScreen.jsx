import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Screen from "../components/Screen";
import BrandHeader from "../components/BrandHeader";
import Card from "../components/Card";
import Button from "../components/Button";
import CarInfosComponent from "../components/CarInfosComponent";
import { compararVeiculos } from "../service/CarService";
import { notify } from "../utils/notify";
import { colors, spacing, typography } from "../theme";

export default function CarComparatorScreen({ navigation }) {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [versao, setVersao] = useState("");
  const [marca2, setMarca2] = useState("");
  const [modelo2, setModelo2] = useState("");
  const [versao2, setVersao2] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleComparar() {
    const campos = [marca, modelo, versao, marca2, modelo2, versao2];
    if (campos.some((campo) => !campo.trim())) {
      notify("Campos obrigatórios", "Preencha os dados dos dois veículos.");
      return;
    }

    setLoading(true);

    try {
      const carros = {
        marca: marca.trim(),
        modelo: modelo.trim(),
        versao: versao.trim(),
        marca2: marca2.trim(),
        modelo2: modelo2.trim(),
        versao2: versao2.trim(),
      };

      const resultado = await compararVeiculos(carros);

      navigation.navigate("ComparatorResult", { carros, resultado });

      setMarca("");
      setModelo("");
      setVersao("");
      setMarca2("");
      setModelo2("");
      setVersao2("");
    } catch (error) {
      console.log(error);
      notify("Erro ao comparar veículos", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <BrandHeader title="CarSearch" subtitle="Compare dois veículos lado a lado" />

      <Card>
        <CarInfosComponent
          label="Veículo 1"
          marca={marca}
          modelo={modelo}
          versao={versao}
          setMarca={setMarca}
          setModelo={setModelo}
          setVersao={setVersao}
        />
      </Card>

      <View style={styles.vsRow}>
        <View style={styles.line} />
        <Text style={styles.vs}>VS</Text>
        <View style={styles.line} />
      </View>

      <Card>
        <CarInfosComponent
          label="Veículo 2"
          marca={marca2}
          modelo={modelo2}
          versao={versao2}
          setMarca={setMarca2}
          setModelo={setModelo2}
          setVersao={setVersao2}
        />
      </Card>

      <Button
        title="Comparar"
        icon="git-compare-outline"
        onPress={handleComparar}
        loading={loading}
        style={styles.button}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  vsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginVertical: spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  vs: {
    ...typography.overline,
  },
  button: {
    marginTop: spacing.xl,
  },
});
