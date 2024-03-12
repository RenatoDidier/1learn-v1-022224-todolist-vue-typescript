import { Atividade, AtividadeParametros, DadosReq } from "@/util/helper/models";
import { validacaoNovaAtividade, validacaoRequisicao } from "@/util/helper/funcoesAuxilio";
import { AxiosResponse } from 'axios';
import { 
  CriarAtividadeRequest, 
  ExcluirAtividadeRequest,
  EditarAtividadeRequest,
  ListarTodasAtividadesRequest 
} from "@/views/Todo/service/TodoServicoRequisicao";

//#region Listar Atividades
export async function listarTodasAtividades(titulo: string = "", conclusao: boolean | null = null) : Promise<Atividade[]> {

  let parametros: AtividadeParametros = {
    titulo: titulo,
    conclusao: conclusao
  };

  const req: AxiosResponse<DadosReq> = await ListarTodasAtividadesRequest(parametros);

  let listaAtividades: Atividade[] = [];

  if (validacaoRequisicao(req))
  {
    listaAtividades = req.data.listaDado.slice();

    return req.data.listaDado;
  }
  return listaAtividades
}
//#endregion

//#region Criar Atividade
export async function criarNovaAtividade (
  novaAtividade: string,
  listaAtividades: Atividade[]
) : Promise<void> {
  if (!validacaoNovaAtividade(novaAtividade)) {
    return;
  }

  const novoItem: AtividadeParametros = {
    conclusao: false,
    titulo: novaAtividade,
  };

  const req: AxiosResponse<DadosReq> = await CriarAtividadeRequest(novoItem);

  if (validacaoRequisicao(req))
  {
    listaAtividades.push(req.data.objetoDado);
  }
    
};
//#endregion

//#region Editar Atividade
export async function editarAtividade (atividadeEditada: Atividade) : Promise<void> {

  const req: AxiosResponse<DadosReq> = await EditarAtividadeRequest(atividadeEditada);

  if (validacaoRequisicao(req))
  {
    console.log('Mensagem de sucesso', req.data.mensagem);
  }
};
//#endregion

//#region Excluir Atividade
export async function excluirAtividade (atividadeExcluida: Atividade, index: number, listaAtividades: Atividade[]) : Promise<void> {

  const req: AxiosResponse<DadosReq> = await ExcluirAtividadeRequest(atividadeExcluida);

  if (validacaoRequisicao(req))
  {
    listaAtividades.splice(index, 1);
  }
};
//#endregion
