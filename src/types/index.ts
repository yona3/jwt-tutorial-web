export interface User {
  id: number;
  uuid: string;
  email: string;
  password: string;
  name: string;
  tokenVersion: number;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  createdAt: Date;
  updatedAt: Date;
}

export interface State {
  accessToken: string | null;
}

export interface Action {
  type: string;
  accessToken: string;
}
