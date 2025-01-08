import request from "@/utils/api";

export const getUsers = () => {
  return request.get(`/users`).then((res) => {
    const { data } = res;
    return data;
  });
};
