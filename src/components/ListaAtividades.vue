<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Atividade } from "@/util/helper/models";

const props = defineProps<{
  listaAtividades: Atividade[];
}>();

defineEmits(["editarAtividade", "excluirAtividade"]);
</script>

<template>
  <div>
    <div
      class="mb-3 d-flex justify-content-between"
      v-for="(atividade, i) in listaAtividades"
      :key="atividade.id"
    >
      <section>
        <label
          for="testarClique"
          class="mr-1"
          style="text-align: start; font-size: 12px; padding-right: 8px"
          :class="{ 'tarefa-concluida': atividade.conclusao }"
        >
          {{ atividade.titulo }}
        </label>
      </section>

      <section class="d-flex justify-content-end align-items-center gap-2">
        <input
          type="checkbox"
          v-model="atividade.conclusao"
          id="testarClique"
          style="width: 20px; height: 20px; margin-right: 18px"
          @change="$emit('editarAtividade', atividade)"
        />
        <div class="d-flex gap-2">
          <button
            class="btn btn-outline-danger btn-sm"
            @click="$emit('excluirAtividade', atividade, i, listaAtividades)"
          >
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
