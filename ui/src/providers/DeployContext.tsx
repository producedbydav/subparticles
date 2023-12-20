import { createContext, useState, useContext, useMemo } from "react";

const DeployContext = createContext({} as any);

export const useDeploy = () => useContext(DeployContext);

export const DeployProvider = ({ children }: any) => {
  const [cover, setCover] = useState(null);

  const value = useMemo(
    () => ({
      cover,
      setCover,
    }),
    [cover, setCover]
  );

  return (
    <DeployContext.Provider value={value}>{children}</DeployContext.Provider>
  );
};
