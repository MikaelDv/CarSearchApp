import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import Screen from "../components/Screen";
import BrandHeader from "../components/BrandHeader";
import CarTitle from "../components/CarTitle";
import Card from "../components/Card";
import Button from "../components/Button";
import { buscarImagem } from "../service/CarService";
import { colors, radius, spacing, typography } from "../theme";

export default function ResultScreen({ navigation }) {
  const route = useRoute();
  const resultado = route.params?.resultado;
  const [imagemUrl, setImagemUrl] = useState(null);
  const [carregandoImagem, setCarregandoImagem] = useState(true);

  useEffect(() => {
    if (!resultado) return;

    buscarImagem({
      marca: resultado.marca,
      modelo: resultado.modelo,
      versao: resultado.versao,
    })
      .then((url) => setImagemUrl(url?.startsWith("http") ? url : null))
      .catch((error) => console.log("Erro ao pesquisar imagem:", error))
      .finally(() => setCarregandoImagem(false));
  }, [resultado]);

  if (!resultado) {
    return (
      <Screen>
        <BrandHeader subtitle="Erro ao carregar dados do veículo." />
        <Button title="Nova Busca" onPress={() => navigation.popToTop()} />
      </Screen>
    );
  }

  const especificacoes = resultado.especificacoes ?? [];

  return (
    <Screen>
      <BrandHeader />
      <View style={styles.header}>
        <CarTitle
          marca={resultado.marca}
          modelo={resultado.modelo}
          versao={resultado.versao}
        />
      </View>

      <View style={styles.imageBox}>
        {carregandoImagem ? (
          <ActivityIndicator color={colors.accent} />
        ) : imagemUrl ? (
          <Image source={{ uri: imagemUrl }} style={styles.image} />
        ) : (
          <Text style={styles.caption}>Imagem indisponível</Text>
        )}
      </View>

      <Card title="Especificações">
        {especificacoes.length === 0 && (
          <Text style={styles.caption}>Nenhuma especificação encontrada.</Text>
        )}
        {especificacoes.map((item, index) => (
          <View key={index} style={styles.specItem}>
            <Text style={styles.specName}>{item.nome}</Text>
            <Text style={styles.specValue}>{item.valor}</Text>
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
          title="Nova Busca"
          onPress={() => navigation.popToTop()}
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
  imageBox: {
    height: 200,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  caption: {
    ...typography.caption,
    textAlign: "center",
  },
  specItem: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  specName: {
    ...typography.caption,
    textTransform: "uppercase",
  },
  specValue: {
    ...typography.section,
    marginTop: 3,
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
