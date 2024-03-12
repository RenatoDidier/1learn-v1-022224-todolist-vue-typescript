export interface Atividade {
  id: string;
  conclusao: boolean;
  titulo: string;
}

export interface RespostaReq {
  status: number; 
  mensagem: string;
  data: DadosReq;
}

export interface DadosReq {
  haErro: boolean;
  listaDado: Atividade[];
  mensagem: string;
  notificacoes: Notificacoes[];
  status: number;
  objetoDado: Atividade;
  objetoDado2: object;
}

export interface Notificacoes {
  key: string;
  message: string;
}

export interface AtividadeParametros {
  id?: string | null;
  conclusao?: boolean | null;
  titulo?: string | null;
}