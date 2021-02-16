import Axios, {
  AxiosResponse,
  AxiosRequestConfig as _AxiosRequestConfig,
  CancelTokenStatic,
  CancelTokenSource as _CancelTokenSource
} from 'axios';
// import { HTTP_URL } from '@/config';
import { Code, codes, errSomethingWentWrong } from '@/api/errors';

// reexport types;
export type AxiosRequestConfig = _AxiosRequestConfig;
export type CancelTokenSource = _CancelTokenSource;

interface AxiosErrorDataJson {
  error: {
    code: Code;
    msg: string;
  };
}
type AxiosErrorData = AxiosErrorDataJson | '';
export type AxiosSucceedResponse<T> = AxiosResponse<T> & { __state: 'success' };
export type AxiosFailedResponse = Partial<AxiosResponse<AxiosErrorData>> & { __state: 'failed' | 'cancelled' };
export type AxiosReply<T extends object | ''> = Promise<AxiosSucceedResponse<T> | AxiosFailedResponse>;

const isBlob = (b: any): b is Blob => {
  // в интеграционных тестах нельзя использовать instanceof Blob
  return b.constructor.name === 'Blob' && typeof b.text === 'function';
};

const fixResponse = async (res: AxiosResponse<AxiosErrorDataJson | string | Blob>): Promise<AxiosResponse<AxiosErrorData>> => {
  const data = res.data;

  // not empty response
  // BSC-274
  if (typeof data === 'string' && data !== '') {
    return {
      ...res,
      data: errSomethingWentWrong(),
    };
  }

  // blob response
  // Object.prototype.hasOwnProperty.call(data, 'text')
  if (typeof data === 'object' && isBlob(data)) {
    const text = await data.text();
    try {
      const json = JSON.parse(text);
      if (Object.prototype.hasOwnProperty.call(json, 'error')) {
        return {
          ...res,
          data: json,
        };
      }
    } catch (err) {
      console.error(err);
    }
    return {
      ...res,
      data: {
        error: {
          code: codes.CodeUndefined,
          msg: text,
        },
      },
    };
  }

  return {
    ...res,
    data,
  };
};

// const logNetworkError = (error: AxiosError, path: string): void => {
//
//   //Запрос отменен пользователем, например отмена загрузки файлов
//   if (Axios.isCancel(error)) {
//     return;
//   }
//   if (path === LOGGER_URL) {
//     return;
//   }
//
//   clientError(getClientError(JSON.stringify(error)));
//   notifyErrorBus.emit({ data: { error: { msg: error.message } } });
// };

const wrapper1 = (func: typeof Axios.get) => {
  return async <T extends object | ''>(path: string, config?: AxiosRequestConfig): AxiosReply<T> => {
    try {
      const response = await func<T>(path, { ...config });
      return {
        ...response,
        __state: 'success',
      };
    } catch (error) {
      if (error.response === undefined) {
        // logNetworkError(error, path);
        return { __state: Axios.isCancel(error) ? 'cancelled' : 'failed' };
      }
      const response: AxiosResponse<AxiosErrorData> = await fixResponse(error.response);

      console.error(response);
      console.error(response.data);
      return {
        ...response,
        __state: Axios.isCancel(error) ? 'cancelled' : 'failed',
      };
    }
  };
};
const wrapper2 = (func: typeof Axios.post) => {
  return async <T extends object | ''>(path: string, data?: any, config?: AxiosRequestConfig): AxiosReply<T> => {
    try {
      const response = await func<T>(path, data, { ...config });
      return {
        ...response,
        __state: 'success',
      };
    } catch (error) {
      if (error.response === undefined) {
        // logNetworkError(error, path);
        return { __state: Axios.isCancel(error) ? 'cancelled' : 'failed' };
      }
      const response: AxiosResponse<AxiosErrorData> = await fixResponse(error.response);

      console.error(response);
      console.error(response.data);
      return {
        ...response,
        __state: Axios.isCancel(error) ? 'cancelled' : 'failed',
      };
    }
  };
};

export const cancelToken: CancelTokenStatic = Axios.CancelToken;

export const rest = {
  get: wrapper1(Axios.get),
  delete: wrapper1(Axios.delete),

  post: wrapper2(Axios.post),
  put: wrapper2(Axios.put),
  patch: wrapper2(Axios.patch),
} as const;
