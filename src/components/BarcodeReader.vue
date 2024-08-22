<template>
  <div class="scanner">
    <input type="text" v-model="barcode" ref="barcodeInput" placeholder="Digite o Código de Barras">
    <div>
    <button @click="handleButtonClick">Scanner</button>
    <button @click="handleManualInput">Pesquisar</button>
    </div>
    <div class="scanner-container" v-if="isScanning">
      <div v-show="!isLoading">
        <video poster="data:image/gif,AAAA" ref="scanner"></video>
        <div class="overlay-element"></div>
        <div class="laser"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { BrowserMultiFormatReader, Exception } from "@zxing/library";
import { ref, onMounted, nextTick, watch } from 'vue';

export default {
  name: "BarcodeReader",

  data() {
    return {
      isLoading: true,
      codeReader: new BrowserMultiFormatReader(),
      isMediaStreamAPISupported: navigator && navigator.mediaDevices && "enumerateDevices" in navigator.mediaDevices,
      barcode: '',
      decodedText: '',
      isScanning: false // Inicialmente o scanner está minimizado
    };
  },

  mounted() {
    if (!this.isMediaStreamAPISupported) {
      throw new Exception("Media Stream API is not supported");
      return;
    }

    nextTick(() => {
      this.initVideo();
    });
  },

  beforeUnmount() {
    this.codeReader.reset();
  },

  watch: {
    isScanning(newVal) {
      if (newVal) {
        nextTick(() => {
          this.initVideo();
          this.start();
        });
      } else {
        this.stopScanning();
      }
    }
  },

  methods: {
    start() {
      this.codeReader.decodeFromVideoDevice(undefined, this.$refs.scanner, (result, err) => {
        if (result) {
          this.barcode = result.text; // Atualiza o campo de entrada com o valor decodificado
          this.$emit('decode', result.text); // Emite o evento com o texto decodificado
          this.stopScanning(); // Para o scanner e fecha a janela
        }
        if (err && !(err instanceof Exception)) {
          console.error(err);
        }
      }).catch(err => {
        console.error(err);
      });
    },

    stopScanning() {
      this.codeReader.reset(); // Para o vídeo
      this.isLoading = true; // Mostra a janela de scan
      this.isScanning = false; // Oculta a janela de scan
    },

    handleButtonClick() {
      this.isScanning = !this.isScanning;
      this.isLoading = !this.isLoading;
    },

    handleManualInput() {
      this.decodedText = this.$refs.barcodeInput.value;
      this.$emit('decode', this.decodedText);
    },

    initVideo() {
      if (this.$refs.scanner) {
        this.$refs.scanner.oncanplay = (event) => {
          this.isLoading = false;
          this.$emit("loaded");
        };
      }
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

.scanner button {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px 0;
  width: 30%;
  margin-right: 10px; 
}
</style>