<template>
    <div>
      <input type="text" v-model="barcode" placeholder="Digite o Código de Barras">
      <button @click="handleButtonClick">Pesquisar</button>
      <p v-if="decodedText">Decoded Text: {{ decodedText }}</p>
    </div>
  
    <div class="scanner-container" v-if="isScanning">
      <div v-show="!isLoading">
        <video poster="data:image/gif,AAAA" ref="scanner"></video>
        <div class="overlay-element"></div>
        <div class="laser"></div>
      </div>
    </div>
  </template>
  
  <script>
  import { BrowserMultiFormatReader, Exception } from "@zxing/library";
  import { ref, onMounted } from 'vue';
  
  export default {
    name: "BarcodeReader",
  
    data() {
      return {
        isLoading: true,
        codeReader: new BrowserMultiFormatReader(),
        isMediaStreamAPISupported: navigator && navigator.mediaDevices && "enumerateDevices" in navigator.mediaDevices,
        barcode: '',
        decodedText: '',
        isScanning: true, // Adiciona a propriedade isScanning
      };
    },
  
    mounted() {
      if (!this.isMediaStreamAPISupported) {
        throw new Exception("Media Stream API is not supported");
        return;
      }
  
      this.start();
      this.$refs.scanner.oncanplay = (event) => {
        this.isLoading = false;
        this.$emit("loaded");
      };
    },
  
    beforeUnmount() {
      this.codeReader.reset();
    },
  
    methods: {
      start() {
        this.codeReader.decodeFromVideoDevice(undefined, this.$refs.scanner, (result, err) => {
          if (result) {
            console.log(result.text);
            this.barcode = result.text; // Atualiza o campo de entrada com o valor decodificado
            this.$emit('decode', result.text);
            this.stopScanning(); // Para o scanner e fecha a janela
          }
        });
      },
      stopScanning() {
        this.codeReader.reset(); // Para o vídeo
        this.isScanning = false; // Oculta a janela de scan
      },
    },
  };
  </script>
  
  <style scoped>
  video {
    max-width: 100%;
    max-height: 100%;
  }
  .scanner-container {
    position: relative;
  }
  
  .overlay-element {
    position: absolute;
    top: 0;
    width: 100%;
    height: 99%;
    background: rgba(30, 30, 30, 0.5);
  
    -webkit-clip-path: polygon(0% 0%, 0% 100%, 20% 100%, 20% 20%, 80% 20%, 80% 80%, 20% 80%, 20% 100%, 100% 100%, 100% 0%);
    clip-path: polygon(0% 0%, 0% 100%, 20% 100%, 20% 20%, 80% 20%, 80% 80%, 20% 80%, 20% 100%, 100% 100%, 100% 0%);
  }
  
  .laser {
    width: 60%;
    margin-left: 20%;
    background-color: tomato;
    height: 1px;
    position: absolute;
    top: 40%;
    z-index: 2;
    box-shadow: 0 0 4px red;
    -webkit-animation: scanning 2s infinite;
    animation: scanning 2s infinite;
  }
  @-webkit-keyframes scanning {
    50% {
      -webkit-transform: translateY(75px);
      transform: translateY(75px);
    }
  }
  @keyframes scanning {
    50% {
      -webkit-transform: translateY(75px);
      transform: translateY(75px);
    }
  }
  
  input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
    width: 100%;
  }
  </style>