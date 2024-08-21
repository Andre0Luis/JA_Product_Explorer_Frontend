<template>
    <div>
        <!-- <div>
            <input type="text" v-model="barcode" placeholder="Digite o Código de Barras">
        </div> -->
    </div>
</template>

<script setup lang="ts">
        import { ref } from 'vue';

        const barcode = ref('');

        // Function to handle barcode input
        const handleBarcodeInput = () => {
            // Do something with the barcode value
            console.log(barcode.value);
        };

        import { PhCamera } from '@phosphor-icons/vue';

const openCameraModal = () => {
    // Open camera modal
    console.log('Camera modal opened');
};
</script>

<style scoped>
input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
    width: 100%;
}
/* Your component's CSS styles go here */
</style>