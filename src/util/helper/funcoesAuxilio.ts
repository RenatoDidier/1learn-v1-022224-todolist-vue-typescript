import { AxiosResponse } from 'axios';
import { DadosReq } from "@/util/helper/models";

export const validacaoNovaAtividade = (titulo: string) => {
  if (!titulo) {
    return false;
  }
  return true;
};

export const validacaoRequisicao = (r: AxiosResponse<DadosReq>) : boolean => {
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