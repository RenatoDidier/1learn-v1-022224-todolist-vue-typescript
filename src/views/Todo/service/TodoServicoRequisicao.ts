import { RequestGet } from "@/util/helper/ConfiguracaoAxios";

const ENDPOINT_GERAL = '/';

export async function ConsultarPrimeiraUrl()
{
  return await RequestGet(ENDPOINT_GERAL);
}