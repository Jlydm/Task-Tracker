import Task from "../../models/task.model.js";

// Function to find task by task_id and user_id
const findTaskByIdAndUserId = async (task_id, user_id) => {
  return await Task.findOne({
    where: { task_id, user_id },
  });
};

export const createTask = async (req, res) => {
  try {
    const { title, text, user_id, date, state } = req.body;

    const newTaks = await Task.create({
      title,
      text,
      date,
      state,
      user_id,
    });

    res.status(201).json(newTaks);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const { user_id } = req.body;

    const allTasks = await Task.findAll({
      where: {
        user_id: user_id,
      },
    });

    res.set(200).json(allTasks);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, date, state, user_id } = req.body;

    await Task.update(
      { title, text, date, state },
      { where: { task_id: id, user_id: user_id } }
    );

    const updateTask = await findTaskByIdAndUserId(id, user_id);

    res.set(200).json(updateTask);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.body.user_id;

    const task = await findTaskByIdAndUserId(id, user_id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const deleteTaks = await Task.destroy({
      where: {
        user_id: user_id,
        id: id,
      },
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};