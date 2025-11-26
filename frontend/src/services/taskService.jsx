import authorizedAxiosInstance from "~/lib/authorizedAxios";

const taskService = {
  getTask: async (filter = {}) => {
    const res = await authorizedAxiosInstance.get("/tasks", { params: filter });
    return res.data;
  },

  createTask: async (title, description, status, priority, deadline, createdBy) => {
    const res = await authorizedAxiosInstance.post("/tasks/task", {
      title,
      description,
      status,
      priority,
      deadline,
      createdBy,
    });

    return res.data;
  },

  deleteTask: async (idTask) => {
    return await authorizedAxiosInstance.delete(`/tasks/del/${idTask}`);
  },

  editTask: async (title, description, status, priority, deadline, idTask) => {
    const res = await authorizedAxiosInstance.put(`/tasks/edit/${idTask}`, {
      title,
      description,
      status,
      priority,
      deadline,
    });

    return res.data;
  },
};

export default taskService;
