export type UserType = "teller" | "customer";

export type Customer = {
  name: string;
};

export type TellerAuth = {
  username: string;
  password: string;
};
