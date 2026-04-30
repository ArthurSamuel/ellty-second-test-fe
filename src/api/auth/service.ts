import Http from "../../core/Http";
import type { HttpBaseResponse } from "../../core/Http.type";
import type { IAuth } from "./auth.type";

export const loginUser = async ({
  password,
  username,
}: {
  username: string;
  password: string;
}): Promise<HttpBaseResponse<IAuth>> => {
  try {
    const resutls = await Http.post<HttpBaseResponse<IAuth>>({
      url: "/auth",
      data: {
        password,
        username,
      },
    });
    return {
      data: resutls.data.data,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const register = async ({
  password,
  username,
}: {
  username: string;
  password: string;
}) => {
  const resutls = await Http.post({
    url: "/user",
    data: {
      password,
      username,
    },
  });
  return resutls;
};
