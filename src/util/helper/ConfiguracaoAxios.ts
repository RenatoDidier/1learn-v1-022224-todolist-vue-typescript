import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const URL_SERVICO = 'http://localhost:5064';
const TIMEOUT_SERVICO = 5000;
let mensagemDeErro = '';

// Configuração inicial do AXIOS
const api = axios.create({
  baseURL: URL_SERVICO,
  timeout: TIMEOUT_SERVICO,
});

export async function RequestGet(
    endpoint: string
  )
{
  try {
    return await api.post(endpoint);
  } catch (erro) {
    console.error(erro);
  }
}

export async function RequestPost(
    endpoint: string,
    dto: object
  )
{
  try {
    return await api.post(endpoint, dto);
  } catch (erro) {
    console.error(erro);
  }
}

export async function RequestPut(
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

export async function RequestDelete(
    endpoint: string,
    dto: object
  )
{
  try {
    return await api.delete(endpoint, dto);
  } catch (erro) {
    console.error(erro);
  }
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