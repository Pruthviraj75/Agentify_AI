// import { createContext } from "react";

// export const UserDetailContext = createContext<any>(null)

import { createContext } from "react";

export const UserDetailContext = createContext({
  userDetail: null,
  setUserDetail: () => {}, // ✅ default function to prevent crash
});