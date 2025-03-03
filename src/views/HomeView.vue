<template>
  <div class="container">
    <h1>Escolha uma opção</h1>
    <div class="button-group">
      <button @click="cadastrarItem">Cadastrar Item no Inventário</button>
      <button @click="consultarProduto">Consultar Produto</button>
      <button @click="editarCadastro">Editar Cadastro</button>
      <button @click="enviarOi">Enviar um Oi para 🌷</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OpcoesMenu",
  methods: {
    cadastrarItem() {
      alert("Redirecionando para cadastro de itens no inventário...");
    },
    consultarProduto() {
      alert("Redirecionando para consulta de produtos...");
    },
    editarCadastro() {
      alert("Redirecionando para edição de cadastro...");
    },
    enviarOi() {
      alert("Oi, 🌷! 😊");
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  background: rgb(120, 236, 158);
  padding: 20px;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: black;
}
.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}
button {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #4B0082;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}
button:hover {
  background-color: #6A0DAD;
}
</style>
