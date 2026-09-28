import { Platform } from "react-native";

import { BASE_URL } from "../config/api";

const TIMEOUT_MS = 60000;

async function request(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição (${response.status})`);
    }

    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("O servidor demorou demais para responder.");
    }
    if (error instanceof TypeError) {
      throw new Error(
        `Não foi possível conectar ao servidor (${BASE_URL}). Verifique sua conexão.`,
      );
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function postJson(path, dados) {
  return request(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
}

export async function buscarCarro(dados) {
  const response = await postJson("/carros", dados);
  return response.json();
}

export async function uploadImagem(asset) {
  const formData = new FormData();

  if (Platform.OS === "web") {
    formData.append("file", asset.file);
  } else {
    // No Android/iOS o FormData do React Native espera { uri, name, type }.
    formData.append("file", {
      uri: asset.uri,
      name: asset.fileName || "carro.jpg",
      type: asset.mimeType || "image/jpeg",
    });
  }

  const response = await request("/carros/upload", {
    method: "POST",
    body: formData,
  });
  return response.json();
}

export async function buscarImagem(dados) {
  const response = await postJson("/carros/pesquisarImagem", dados);
  return response.text();
}

export async function compararVeiculos(dados) {
  const response = await postJson("/carros/comparar", dados);
  return response.json();
}
