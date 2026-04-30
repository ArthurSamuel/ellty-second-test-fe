import type { AxiosResponse } from "axios";
import * as React from "react";
import type { HttpBaseResponse } from "../core/Http.type";

interface IUseHttp<T> {
  fn: () => Promise<AxiosResponse<HttpBaseResponse<T>>>;
  enabled?: boolean;
}

const useHttp = <T>({ fn, enabled }: IUseHttp<T>) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<AxiosResponse<HttpBaseResponse<T>>>();

  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      setIsLoading(true);
      const results = await fn();
      setData(results);
      setIsLoading(false);
    };

    if (enabled !== false) {
      fetchData().catch((err) => console.log(err));
    }
  }, [enabled]);

  return {
    isLoading,
    data,
  };
};

export default useHttp;
