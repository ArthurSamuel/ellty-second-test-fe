import React, { useState } from "react";
import { Storage } from "../core/Storage";

interface IUserLogin {
  id: number;
  username: string;
}

interface UserInformationContextProps {
  user: IUserLogin | null;
  set: (param: IUserLogin | null) => void;
}

const userInformationContextDefault: UserInformationContextProps = {
  user: {} as IUserLogin,
  set: () => {},
};

export const UserInformationStateContext =
  React.createContext<UserInformationContextProps>(
    userInformationContextDefault
  );

const UserInformationContextFC: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [data, setData] = useState<IUserLogin | null>(() => {
    const temp = Storage.get();
    return temp ? JSON.parse(temp) : null;
  });

  function set(param: IUserLogin | null) {
    setData(param);
  }

  return (
    <UserInformationStateContext.Provider value={{ set, user: data }}>
      {children}
    </UserInformationStateContext.Provider>
  );
};

export const useUserInformation = () =>
  React.useContext(UserInformationStateContext);

export default UserInformationContextFC;
