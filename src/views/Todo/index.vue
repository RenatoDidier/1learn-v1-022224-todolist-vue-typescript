<script setup lang="ts">
import { ref, computed } from "vue";

import ComponenteListaAtividades from "@/components/ListaAtividades.vue";

import { Atividade } from "@/util/helper/models";

import {
  criarNovaAtividade,
  excluirAtividade,
  editarAtividade,
} from "@/util/helper/funcoesCrud";

const tituloNovaAtividade = ref<string>("");

const listaAtividades = ref<Atividade[]>([
  { id: "1", concluido: false, titulo: "Tarefa 1" },
  { id: "2", concluido: true, titulo: "Tarefa 2" },
]);

const quantidadeAtividadeTotal = computed(() => {
  return listaAtividades.value.length;
});

const quantidadeAtividadeConcluidas = computed(() => {
  return listaAtividades.value.filter((x) => x.concluido).length;
});
</script>

<template>
  <div class="container">
    <div class="container-todo-list">
      <h2 style="font-style: italic">To Do List</h2>

      <div class="d-flex align-items-end gap-3">
        <section class="d-flex flex-column align-items-start">
          <label for="novaTarefaInput" class="negrito">Nova Tarefa</label>
          <input
            v-model="tituloNovaAtividade"
            type="text"
            id="novaTarefaInput"
            class="form-control form-control-sm"
          />
        </section>
        <section>
          <button
            class="btn btn-secondary btn-sm"
            type="button"
            id="button-addon2"
            @click="criarNovaAtividade(tituloNovaAtividade, listaAtividades)"
          >
            +
          </button>
        </section>
      </div>

      <hr />

      <div class="d-flex justify-content-between">
        <section class="d-flex flex-column align-items-start">
          <label for="inputPesquisar" class="negrito">Pesquisar</label>
          <div class="col-12">
            <input
              type="text"
              id="inputPesquisar"
              class="form-control form-control-sm"
            />
          </div>
        </section>
        <section class="d-flex flex-column align-items-start">
          <label for="inputPesquisar" class="negrito">Filtrar</label>
          <select
            class="form-select form-select-sm"
            aria-label="Small select example"
          >
            <option selected>Todos</option>
            <option value="1">Concluídos</option>
            <option value="2">Em Aberto</option>
          </select>
        </section>
      </div>

      <hr />

      <h4 class="mb-3">
        [{{ quantidadeAtividadeConcluidas }}/{{ quantidadeAtividadeTotal }}]
      </h4>

      <ComponenteListaAtividades
        :lista-atividades="listaAtividades"
        @editar-atividade="editarAtividade"
        @excluir-atividade="excluirAtividade"
      />
    </div>
  </div>
</template>

<style scoped>
.borda-card {
  border-bottom: 0.1ch solid lightgrey;
}

.container-todo-list {
  border: 1px solid black;
  margin-top: 10px;
  padding: 12px 24px;
  border-radius: 12px;
  max-width: 500px;
}

.tarefa-concluida {
  text-decoration: line-through;
}
</style>
@/util/helper/funcoesCrud
