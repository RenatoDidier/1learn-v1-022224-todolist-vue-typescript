<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";

import ComponenteListaAtividades from "@/components/ListaAtividades.vue";

import { Atividade } from "@/util/helper/models";

import {
  listarTodasAtividades,
  criarNovaAtividade,
  excluirAtividade,
  editarAtividade,
} from "@/util/helper/funcoesCrud";

let tituloNovaAtividade = ref<string>("");
let listaAtividades = ref<Atividade[]>([]);

let filtroTituloAtividades = ref<string>("");
let filtroConclusaoAtividades = ref<boolean | null>(null);

let quantidadeAtividadeTotal = computed(() => {
  return listaAtividades.value.length;
});
let quantidadeAtividadeConcluidas = computed(() => {
  return listaAtividades.value.filter((x) => x.conclusao).length;
});

watch(filtroTituloAtividades, (novoValor, valorAntigo) => {
  if (!novoValor) {
    listarAtividades(
      filtroTituloAtividades.value,
      filtroConclusaoAtividades.value
    );
  }
});

const listarAtividades = async (titulo: string, conclusao: boolean | null) => {
  const resposta: Atividade[] = await listarTodasAtividades(titulo, conclusao);

  listaAtividades.value = resposta.slice();
};

onMounted(async () => {
  const resposta: Atividade[] = await listarTodasAtividades();

  listaAtividades.value = resposta.slice();
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
              v-model="filtroTituloAtividades"
              type="text"
              id="inputPesquisar"
              class="form-control form-control-sm"
              @keyup.enter="
                listarAtividades(
                  filtroTituloAtividades,
                  filtroConclusaoAtividades
                )
              "
            />
          </div>
        </section>
        <section class="d-flex flex-column align-items-start">
          <label for="inputPesquisar" class="negrito">Filtrar</label>
          <select
            v-model="filtroConclusaoAtividades"
            class="form-select form-select-sm"
            aria-label="Small select example"
            @change="
              listarAtividades(
                filtroTituloAtividades,
                filtroConclusaoAtividades
              )
            "
          >
            <option :value="null" selected>Todos</option>
            <option :value="true">Concluídos</option>
            <option :value="false">Em Aberto</option>
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
