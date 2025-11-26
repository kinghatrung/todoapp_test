import authorizedAxiosInstance from "~/lib/authorizedAxios";

const authService = {
  signIn: async (username, password) => {
    const res = await authorizedAxiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`, {
      username,
      password,
    });

    return res.data;
  },

  signUp: async (email, firstName, lastName, password, username) => {
    const res = await authorizedAxiosInstance.post("/auth/signup", {
      email,
      firstName,
      lastName,
      password,
      username,
    });

    return res.data;
  },

  signOut: async () => {
    return await authorizedAxiosInstance.delete("/auth/signout");
  },

  refreshToken: async () => {
    const res = await authorizedAxiosInstance.post("/auth/refresh");
    return res.data.accessToken;
  },
};

export default authService;
