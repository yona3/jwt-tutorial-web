import type { ReactNode, VFC } from "react";

import { Header } from "./Header";

interface Props {
  children: ReactNode;
}

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-5">{children}</div>
    </div>
  );
};
