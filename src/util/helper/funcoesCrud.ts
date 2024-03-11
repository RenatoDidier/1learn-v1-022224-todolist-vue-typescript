import { Atividade, AtividadeParametros, DadosReq, RespostaReq } from "@/util/helper/models";
import { 
  CriarAtividadeRequest, 
  ExcluirAtividadeRequest,
  ListarTodasAtividadesRequest 
} from "@/views/Todo/service/TodoServicoRequisicao";
import { AxiosResponse } from 'axios';

export async function listarTodasAtividades(titulo = "", conclusao = null) : Promise<Atividade[]> {

  let parametros: AtividadeParametros = {
    titulo: titulo,
    conclusao: conclusao
  };

  const req: AxiosResponse<DadosReq> = await ListarTodasAtividadesRequest(parametros);

  let listaAtividades: Atividade[] = [];

  if (validacaoRequisicao(req))
  {
    listaAtividades = req.data.listaDado;

    return req.data.listaDado;
  }
  return listaAtividades
}

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

export function editarAtividade (atividadeEditada: Atividade) : void {
  console.log("Configurar o editar a tarefa", atividadeEditada);
};

export async function excluirAtividade (atividadeExcluida: Atividade, index: number, listaAtividades: Atividade[]) : Promise<void> {

  const req: AxiosResponse<DadosReq> = await ExcluirAtividadeRequest(atividadeExcluida);

  console.log('Chamou aqui', req);

  if (validacaoRequisicao(req))
  {
    listaAtividades.splice(index, 1);
  }
};

const validacaoNovaAtividade = (titulo: string) => {
  if (!titulo) {
    return false;
  }
  return true;
};

const validacaoRequisicao = (r: AxiosResponse<DadosReq>) : boolean => {
  if (r.data.status !== 201) {
    if (r.data.notificacoes && r.data.notificacoes.length > 0) {
      r.data.notificacoes.forEach(erro => {
        console.error(`Erro: ${erro.key} - Mensagem: ${erro.message}`)
      })
    } else {
      console.error(`Erro: ${r.data.mensagem}`)
    }
    return false;
  }
  return true;
};