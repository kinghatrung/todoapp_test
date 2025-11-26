import Task from "../models/Task.js";

const taskService = {
  getTasks: async (status, priority, search, page = 1, limit = 5) => {
    try {
      const query = {};
      if (status && status !== "all") {
        query.status = status;
      }
      if (priority && priority !== "all") {
        query.priority = priority;
      }
      if (search) {
        query.title = { $regex: search, $options: "i" };
      }

      const skip = (page - 1) * limit;

      const tasks = await Task.find(query)
        .populate("createdBy", "displayName")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await Task.countDocuments(query);

      return {
        tasks,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasPrev: page > 1,
          hasNext: page < Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  },

  createTask: async (title, description, status, priority, deadline, createdBy) => {
    try {
      if (!title || !description || !status || !priority || !deadline || !createdBy)
        throw new Error("Không được thiếu các thông tin trên");

      await Task.create({
        title,
        description,
        status,
        priority,
        deadline,
        createdBy,
      });

      return true;
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const deleted = await Task.findByIdAndDelete(id);

      if (!deleted) {
        throw new Error("Không tìm thấy Task");
      }

      return true;
    } catch (error) {
      throw error;
    }
  },

  editTask: async (id, title, description, status, priority, deadline) => {
    try {
      const oldTask = await Task.findById(id);

      if (!oldTask) throw new Error("Không tìm thấy Task");

      const updates = {};

      if (title !== oldTask.title) updates.title = title;
      if (description !== oldTask.description) updates.description = description;
      if (status !== oldTask.status) updates.status = status;
      if (priority !== oldTask.priority) updates.priority = priority;
      if (deadline && new Date(deadline).getTime() !== oldTask.deadline.getTime())
        updates.deadline = new Date(deadline);

      if (Object.keys(updates).length === 0) return oldTask;

      await Task.findByIdAndUpdate(id, updates, { new: true });

      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default taskService;
