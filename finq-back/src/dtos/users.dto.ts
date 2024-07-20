import { RandomUser } from "../interfaces/user.interace";

export interface RandomUsersDTO {
  results: RandomUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
