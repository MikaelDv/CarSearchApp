import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Screen from "../components/Screen";
import BrandHeader from "../components/BrandHeader";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { uploadImagem } from "../service/CarService";
import { notify } from "../utils/notify";
import { colors, radius, spacing, typography } from "../theme";

export default function HomeScreen({ navigation }) {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [versao, setVersao] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagem, setImagem] = useState(null);

  function handleAvancar() {
    if (!marca.trim() || !modelo.trim() || !versao.trim()) {
      notify("Campos obrigatórios", "Preencha marca, modelo e versão.");
      return;
    }

    navigation.navigate("Step2", {
      marca: marca.trim(),
      modelo: modelo.trim(),
      versao: versao.trim(),
    });

    setMarca("");
    setModelo("");
    setVersao("");
    setImagem(null);
  }

  async function selecionarImagem() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImagem(asset.uri);
      handleUploadImagem(asset);
    }
  }

  async function handleUploadImagem(asset) {
    try {
      setLoading(true);
      const response = await uploadImagem(asset);
      setMarca(response.marca ?? "");
      setModelo(response.modelo ?? "");
      setVersao(response.versao ?? "");
    } catch (error) {
      console.log(error);
      setImagem(null);
      notify("Erro ao analisar imagem", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <BrandHeader
        title="CarSearch"
        subtitle="Encontre veículos da concorrência com precisão"
      />

      <Button
        title="Identificar por imagem"
        icon="camera-outline"
        onPress={selecionarImagem}
        loading={loading}
      />

      {imagem && (
        <Image
          source={{ uri: imagem }}
          style={styles.preview}
          blurRadius={loading ? 8 : 0}
        />
      )}

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>ou digite</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.form}>
        <TextField
          placeholder="Marca (ex: Ford)"
          value={marca}
          onChangeText={setMarca}
          maxLength={25}
        />
        <TextField
          placeholder="Modelo (ex: Ranger)"
          value={modelo}
          onChangeText={setModelo}
          maxLength={35}
        />
        <TextField
          placeholder="Versão (ex: Raptor)"
          value={versao}
          onChangeText={setVersao}
          maxLength={50}
        />

        <Button
          title="Avançar"
          icon="arrow-forward"
          onPress={handleAvancar}
          disabled={loading}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  preview: {
    width: "100%",
    height: 180,
    borderRadius: radius.md,
    marginTop: spacing.lg,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginVertical: spacing.xl,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...typography.caption,
  },
  form: {
    gap: spacing.md,
  },
});
