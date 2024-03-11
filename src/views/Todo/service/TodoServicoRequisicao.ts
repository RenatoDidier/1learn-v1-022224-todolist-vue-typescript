import { 
  RequestGetAsync,
  RequestPostAsync,
  RequestDeleteAsync,
  RequestPutAsync
 } from "@/util/helper/ConfiguracaoAxios";
import { Atividade, AtividadeParametros } from "@/util/helper/models";
import { AxiosResponse } from "axios";

const ENDPOINT_GERAL = '/';
const ENDPOINT_LISTAR_TODAS_ATIVIDADES = '/v1/atividade/listar';
const ENDPOINT_LISTAR_ATIVIDADE_POR_ID = '/v1/atividade/listar/';
const ENDPOINT_CRIAR_ATIVIDADE = '/v1/atividade/criar';
const ENDPOINT_EDITAR_ATIVIDADE = '/v1/atividade/editar';
const ENDPOINT_EXCLUIR_ATIVIDADE = '/v1/atividade/excluir/';

export async function ConsultarPrimeiraUrl()
{
  return await RequestGetAsync(ENDPOINT_GERAL);
}

export async function ListarTodasAtividadesRequest<T>(parametros: AtividadeParametros) : Promise<AxiosResponse<T>>
{
  return await RequestPostAsync<T>(ENDPOINT_LISTAR_TODAS_ATIVIDADES, parametros);
}

export async function CriarAtividadeRequest<T>(parametros: AtividadeParametros) : Promise<AxiosResponse<T>>
{
  return await RequestPostAsync<T>(ENDPOINT_CRIAR_ATIVIDADE, parametros);
}


export async function ListarAtividadePorIdRequest()
{
  return await RequestGetAsync(ENDPOINT_LISTAR_ATIVIDADE_POR_ID);
}

// export async function EditarAtividadeRequest()
// {
//   return await RequestGetAsync(ENDPOINT_EDITAR_ATIVIDADE);
// }

export async function ExcluirAtividadeRequest<T>(parametros: Atividade) : Promise<AxiosResponse<T>>
{
  let ENDPOINT_FINAL = ENDPOINT_EXCLUIR_ATIVIDADE + parametros.id;

  return await RequestDeleteAsync<T>(ENDPOINT_FINAL);
}