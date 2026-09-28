# CarSearch — Desafio Ford

Aplicativo mobile (React Native + Expo) para **pesquisa e comparação de veículos da concorrência**. O usuário identifica um carro por foto ou digitando marca, modelo e versão, escolhe as especificações que quer ver e recebe os dados técnicos. Também pode comparar dois veículos lado a lado.

A inteligência fica no backend Spring Boot (`../carSearch_backend`), que usa a OpenAI para identificar e descrever veículos e a Google Custom Search para as imagens.

## Funcionalidades

| Fluxo | Telas | Descrição |
|---|---|---|
| **Busca** | Home → Especificações → Resultado | Identificação por imagem (galeria) ou manual, escolha das especificações e ficha técnica com foto do veículo |
| **Comparação** | Comparar → Resultado da comparação | Dados de dois veículos e lista de diferenças/observações geradas pela IA |

## Demonstração

| Home | Especificações | Resultado |
|---|---|---|
| ![Home](docs/screenshots/home.png) | ![Especificações](docs/screenshots/spec.png) | ![Resultado](docs/screenshots/result.png) |

| Comparar | Resultado da comparação |
|---|---|
| ![Comparar](docs/screenshots/comparator.png) | ![Resultado da comparação](docs/screenshots/comparator-result.png) |

> Os prints ficam em `docs/screenshots/` com os nomes acima.

## Identidade visual

Todas as cores, espaçamentos, raios e estilos de texto estão centralizados em [`src/theme/index.js`](src/theme/index.js). As telas não usam valores soltos — consomem os tokens e os componentes compartilhados:

| Token | Cor | Uso |
|---|---|---|
| `background` | `#0F172A` | Fundo das telas |
| `surface` | `#1E293B` | Cards e campos |
| `primary` | `#2563EB` | Botões principais |
| `accent` | `#3B82F6` | Destaques (marca, badges) |
| `fordBlue` | `#102B4E` | Barra de abas |
| `textMuted` | `#94A3B8` | Textos secundários |

## Estrutura

```
CarSearch/
├── App.js                     # SafeAreaProvider + navegação
├── app.json                   # Config Expo (ícone, splash, package Android)
├── eas.json                   # Perfis de build (APK)
└── src/
    ├── components/            # Screen, BrandHeader, CarTitle, Card, Button, TextField, CarInfosComponent
    ├── config/api.js          # URL do backend (EXPO_PUBLIC_API_URL)
    ├── navigation/            # Abas (Buscar/Comparar) + stacks de cada fluxo
    ├── screens/               # Home, Spec, Result, CarComparator, CarComparatorResult
    ├── service/CarService.js  # Chamadas HTTP ao backend
    ├── theme/index.js         # Design tokens
    └── utils/notify.js        # Alertas (nativo e web)
```

## Como rodar

### 1. Backend

```bash
cd ../carSearch_backend
export OPENAI_API_KEY=...        # chave da OpenAI
export GOOGLE_SEARCH_API_KEY=... # chave da Google Custom Search
./mvnw spring-boot:run           # sobe em http://0.0.0.0:8080
```

### 2. App

```bash
cd CarSearch
npm install
cp .env.example .env   # ajuste o IP do backend
npx expo start
```

`EXPO_PUBLIC_API_URL` precisa apontar para o computador que roda o backend:

- **Celular físico:** IP do computador na mesma rede Wi-Fi (ex: `http://192.168.0.10:8080`)
- **Emulador Android:** `http://10.0.2.2:8080`
- **Web:** `http://localhost:8080`

## Gerando o APK

```bash
npm install -g eas-cli
eas login
eas build:configure          # só na primeira vez, vincula o projeto à sua conta Expo
```

Edite `EXPO_PUBLIC_API_URL` no perfil `preview` do [`eas.json`](eas.json) com o endereço do backend e rode:

```bash
eas build -p android --profile preview
```

Ao final, o EAS mostra um link/QR code para baixar o `.apk`. Para instalar:

- **Dispositivo físico:** abra o link no celular e instale (permita "fontes desconhecidas").
- **Emulador:** `adb install caminho/para/CarSearch.apk`

> O app acessa o backend via HTTP, por isso `usesCleartextTraffic` está habilitado em `app.json` (via `expo-build-properties`). Se o backend for publicado com HTTPS, essa opção pode ser removida.

## Tecnologias

- React Native 0.81 · Expo SDK 54 · React 19
- React Navigation 7 (bottom tabs + native stack)
- expo-image-picker
- Backend: Java / Spring Boot · OpenAI · Google Custom Search
