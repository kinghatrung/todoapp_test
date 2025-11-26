import authorizedAxiosInstance from "~/lib/authorizedAxios";

const userService = {
  fetchMe: async () => {
    const res = await authorizedAxiosInstance.get("users/me");
    return res.data;
  },
};

export default userService;
