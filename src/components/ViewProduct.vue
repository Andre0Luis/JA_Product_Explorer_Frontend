<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Product } from '@/model/ProductDTO';

const props = defineProps<{product: Product | null}>();

</script>

<template>
    <div v-if="props.product && Object.keys(props.product).length > 0">
        <div class="product-info">
            <h2>Produto</h2>
            <p>{{ product?.nome }}</p>
            <hr>
            <h2>Preço</h2>
            <p>{{ product?.preco }}</p>
            <hr>
            <h2>Estoque</h2>
            <p>{{ product?.estoque }}</p>
            <hr>
            <h2>Última Atualização</h2>
            <p>{{ product?.dataAtualizacao }}</p>
            <hr>
            <h2>Código de Barras</h2>
            <p>{{ product?.codigoDeBarras }}</p>
        </div>
    </div>
    <div class="error" v-else>
      <p>Produto não encontrado</p>
      <transition name="blink">
        <div v-if="props.product && Object.keys(props.product).length === 0" key="blink"></div>
      </transition>
    </div>
</template>


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
.error p {
    background-color: #f2f2f2;
    color: #333;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    font-weight: bold;
    margin-block: 10px;
    text-align: center;
}

.blink-enter-active, .blink-leave-active {
  animation: blink 3s infinite;
}
.blink-enter, .blink-leave-to /* .blink-leave-active in <2.1.8 */ {
  opacity: 0;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

</style>