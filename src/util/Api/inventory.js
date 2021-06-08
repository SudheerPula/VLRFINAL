import { axios } from "../../config/config";
import { path } from "../path";

export function fetchInventoryDataAPI({id}) {
  return axios.get(`${path.INVENTORY}${id}`);
}
