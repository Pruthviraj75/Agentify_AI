// import { createContext } from "react";

// export const UserDetailContext = createContext<any>(null)

// import { createContext } from "react";

// export const UserDetailContext = createContext({
//   userDetail: null,
//   setUserDetail: () => {}, // ✅ default function to prevent crash
// });

import React, { createContext } from "react";

type UserDetailType = {
  _id: string;
  name?: string;
  email?: string;
  remainingCredits?: number;
  [key: string]: any;
};

type UserDetailContextType = {
  userDetail: UserDetailType | null;
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetailType | null>>;
};

export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => {},
});