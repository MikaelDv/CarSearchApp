import { StyleSheet, Text, View } from "react-native";

import TextField from "./TextField";
import { spacing, typography } from "../theme";

export default function CarInfosComponent({
  label,
  marca,
  modelo,
  versao,
  setMarca,
  setModelo,
  setVersao,
}) {
  return (
    <View style={styles.form}>
      {label && <Text style={styles.label}>{label}</Text>}
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
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
  },
  label: {
    ...typography.overline,
    fontSize: 13,
  },
});
