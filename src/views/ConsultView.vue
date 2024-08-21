<script setup lang="ts">
import ViewProduct from '../components/ViewProduct.vue'
import ConsultProduct from '@/components/ConsultProduct.vue';
import BarcodeReader from '@/components/BarcodeReader.vue';

</script>

<template>
    <div class="barcode_reader">
        <h1>Leitor de Código de Barras</h1>
        <ConsultProduct></ConsultProduct>
        <BarcodeReader></BarcodeReader>
    </div>
    <div class="background">        
        <h1>Consulta de Produtos</h1>
        <ViewProduct></ViewProduct>
        
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