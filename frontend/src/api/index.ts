import axios from "axios";

const base_url =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const connectionInstance = axios.create();

export const getMembersData = () => {
  return connectionInstance.get(base_url);
};
