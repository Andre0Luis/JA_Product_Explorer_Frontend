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

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick, watch } from 'vue';
import { BrowserMultiFormatReader, Exception } from "@zxing/library";

export default defineComponent({
  name: "BarcodeReader",

  setup(_, { emit }) {
    const isLoading = ref(true);
    const codeReader = new BrowserMultiFormatReader();
    const isMediaStreamAPISupported = ref(navigator && navigator.mediaDevices && "enumerateDevices" in navigator.mediaDevices);
    const barcode = ref('');
    const decodedText = ref('');
    const isScanning = ref(false);
    const barcodeInput = ref<HTMLInputElement | null>(null);
    const scanner = ref<HTMLVideoElement | null>(null);

    const start = () => {
      codeReader.decodeFromVideoDevice(null, scanner.value!, (result, err) => {
        if (result) {
          barcode.value = result.getText();
          emit('decode', result.getText());
          stopScanning();
        }
        if (err && !(err instanceof Exception)) {
          console.error(err);
        }
      }).catch(err => {
        console.error(err);
      });
    };

    const stopScanning = () => {
      codeReader.reset();
      isLoading.value = true;
      isScanning.value = false;
    };

    const handleButtonClick = () => {
      isScanning.value = !isScanning.value;
      isLoading.value = !isLoading.value;
    };

    const handleManualInput = () => {
      decodedText.value = barcodeInput.value?.value || '';
      emit('decode', decodedText.value);
    };

    const initVideo = () => {
      if (scanner.value) {
        scanner.value.oncanplay = () => {
          isLoading.value = false;
          emit("loaded");
        };
      }
    };

    onMounted(() => {
      if (!isMediaStreamAPISupported.value) {
        throw new Exception("Media Stream API is not supported");
      }

      nextTick(() => {
        initVideo();
      });
    });

    watch(isScanning, (newVal) => {
      if (newVal) {
        nextTick(() => {
          initVideo();
          start();
        });
      } else {
        stopScanning();
      }
    });

    return {
      isLoading,
      barcode,
      decodedText,
      isScanning,
      barcodeInput,
      scanner,
      handleButtonClick,
      handleManualInput,
      initVideo,
      start,
      stopScanning
    };
  }
});
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