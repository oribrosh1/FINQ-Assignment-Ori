import axios from "axios";
import { RandomUser } from "../../interfaces/user.interace";
import { RandomUsersDTO } from "../../dtos/users.dto";

async function getUsers(limit = 10): Promise<Array<RandomUser>> {
  const {
    data: { results: users },
  }: { data: RandomUsersDTO } = await axios.get(
    `https://randomuser.me/api/?results=${limit}`
  );
  return users;
}

export { getUsers };
