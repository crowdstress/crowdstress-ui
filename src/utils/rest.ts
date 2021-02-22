import Axios, {
  AxiosResponse,
  AxiosRequestConfig as _AxiosRequestConfig,
  CancelTokenStatic,
  CancelTokenSource as _CancelTokenSource
} from 'axios';

// reexport types;
export type AxiosRequestConfig = _AxiosRequestConfig;
export type CancelTokenSource = _CancelTokenSource;

interface AxiosErrorDataJson {
  error: {
    code: number;
    msg: string;
  };
}
type AxiosErrorData = AxiosErrorDataJson | '';
export type AxiosSucceedResponse<T> = AxiosResponse<T> & { __state: 'success' };
export type AxiosFailedResponse = Partial<AxiosResponse<AxiosErrorData>> & { __state: 'failed' | 'cancelled' };
export type AxiosReply<T extends object | ''> = Promise<AxiosSucceedResponse<T> | AxiosFailedResponse>;

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
        // send error
        return { __state: Axios.isCancel(error) ? 'cancelled' : 'failed' };
      }

      console.error(error.response);
      return {
        ...error.response,
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
        // send error
        return { __state: Axios.isCancel(error) ? 'cancelled' : 'failed' };
      }

      console.error(error.response);
      return {
        ...error.response,
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
