<script setup lang="ts">
import { ref } from 'vue';
import { defineAsyncComponent } from 'vue';
const ViewProduct = defineAsyncComponent(() => import('../components/ViewProduct.vue'));
import BarcodeReader from '../components/BarcodeReader.vue';
import SearchExplorerService from '../services/SearchExplorerService';
import type { Product } from '../model/ProductDTO';


const barcode = ref('');
const product = ref<Product | null>(null);
const error = ref('');

async function handleBarcodeInput(text: string) {
    barcode.value = text;
    try {
        const response = await SearchExplorerService.getProduct(barcode.value);
        product.value = response;
        error.value = '';
  } catch (err) {
    product.value = null;
    error.value = 'Produto não encontrado';
  }
}


</script>

<template>
    <div class="barcode_reader">
        <h1>Leitor de Código de Barras</h1>
        <BarcodeReader @decode="handleBarcodeInput"></BarcodeReader>
    </div>
    <div class="background">        
        <h1>Consulta de Produtos</h1>
        <ViewProduct :product="product" v-if="product"></ViewProduct>
        <p v-else-if="error">{{ error }}</p>

        
    </div>
</template>

<style scoped>
.barcode_reader {
    background-color: #51119f;
    color: #333;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    font-weight: bold;
    margin-block: 10px;
    text-align: center;
}
/* Add your component styles here */
.background {
    background-color: #51119f;
    color: #333;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    font-weight: bold;
    margin-block: 10px;
    text-align: center;
}

.background h1 {
    color: #ffffff;
    font-size: 2.0rem;
    text-align: center;
    margin-block: 10px;
}
.barcode_reader h1 {
    color: #ffffff;
    font-size: 1.5rem;
    text-align: center;
    margin-block: 10px;
}
</style>