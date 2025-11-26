import taskService from "../services/taskService.js";

const taskController = {
  getTasks: async (req, res) => {
    try {
      const { status, priority, search } = req.query;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const tasks = await taskService.getTasks(status, priority, search, page, limit);

      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createTask: async (req, res) => {
    try {
      const { title, description, status, priority, deadline, createdBy } = req.body;
      await taskService.createTask(title, description, status, priority, deadline, createdBy);

      res.status(200).json({ message: "Tạo công việc thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const id = req.params.id;
      await taskService.deleteTask(id);
      res.status(200).json({ message: "Xóa công việc thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  editTask: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, status, priority, deadline } = req.body;
      await taskService.editTask(id, title, description, status, priority, deadline);

      res.status(200).json({ message: "Lưu công việc thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default taskController;
