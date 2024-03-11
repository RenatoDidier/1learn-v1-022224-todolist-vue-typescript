import axios, { Axios, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const URL_SERVICO = 'http://localhost:5206';
const TIMEOUT_SERVICO = 5000;
let mensagemDeErro = '';

// Configuração inicial do AXIOS
const api = axios.create({
  baseURL: URL_SERVICO,
  timeout: TIMEOUT_SERVICO,
});

export async function RequestGetAsync<T>(
    endpoint: string
  ) : Promise<AxiosResponse<T>>
{
  return await api.get<T>(endpoint);
}

export async function RequestPostAsync<T>(
    endpoint: string,
    dto: object
  ) : Promise<AxiosResponse<T>>
{
  return await api.post<T>(endpoint, dto);
}

export async function RequestPutAsync(
    endpoint: string,
    dto: object
  )
{
  try {
    return await api.put(endpoint, dto);
  } catch (erro) {
    console.error(erro);
  }
}

export async function RequestDeleteAsync<T>(
    endpoint: string
  ) : Promise<AxiosResponse<T>>
{
  return await api.delete<T>(endpoint);
}



api.interceptors.response.use(
  (config : AxiosResponse) => {
    return config;
  },
  erro => {
    InterceptarErro(erro);
  }
)

// Aqui eu posso fazer a configuração do Token de acesso
api.interceptors.request.use(
  (config : InternalAxiosRequestConfig) => {
    return config
  },
  erro => {
    InterceptarErro(erro);
  }
)

async function InterceptarErro(erro : any) {
  // Configurar alguma ação para o axios
  if (erro.response.status == 401) {
    mensagemDeErro = 'Credenciais inválidas'
  } else if (erro.response.status === 500) {
    mensagemDeErro = 'Erro no servidor'
  }
}