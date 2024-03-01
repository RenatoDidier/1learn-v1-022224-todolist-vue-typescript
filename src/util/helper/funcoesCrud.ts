import { Atividade } from "@/util/helper/models";


export function criarNovaAtividade (
  novaAtividade: string,
  listaAtividades: Atividade[]
) : void {
  // console.log("Teste pra ver o this");
  // if (!validacaoNovaAtividade(novaAtividade)) {
  //   return;
  // }

  // const novoItem: Atividade = {
  //   id: "4",
  //   concluido: false,
  //   titulo: novaAtividade,
  // };

  // listaAtividades.push(novoItem);
};

export function editarAtividade (atividadeEditada: Atividade) : void {
  console.log("Configurar o editar a tarefa", atividadeEditada);
};

export function excluirAtividade (atividadeExcluida: Atividade) : void {
  console.log("Teste para ver a tarefa", atividadeExcluida);
};

const validacaoNovaAtividade = (novaAtividade: string) => {
  if (!novaAtividade) {
    return false;
  }
  return true;
};

