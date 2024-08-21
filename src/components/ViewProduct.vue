<template>
    <div>
        <div class="product-info">
            <h2>Produto</h2>
            <p>{{ product }}</p>
            <hr>
            <h2>Preço</h2>
            <p>{{ price }}</p>
            <hr>
            <h2>Estoque</h2>
            <p>{{ stock }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
// Your component's TypeScript logic goes here
import { ref } from 'vue';

// Define reactive variables
const product = ref('');
const price = ref(0);
const stock = ref(0);

// Function to fetch product data
const fetchProductData = () => {
    // Make an API call or fetch data from a source
    // Assign the received values to the reactive variables
    product.value = 'Luizinho';
    price.value = 1.99;
    stock.value = 1;
};

// Call the fetchProductData function to populate the data initially
fetchProductData();
</script>

<style scoped>
/* Your component's CSS styles go here */
.product-info {
    background-color: #f2f2f2;
    color: #333;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    font-weight: bold;
    margin-block: 10px;
    text-align: left;

}
.product-info h2 {
    color: #000000;
    font-size: 1.5rem;
    margin-block: 10px;
    font-weight: bold;
}
.product-info p {
    font-size: 2.0rem;
    margin-block: 10px;
}

</style>