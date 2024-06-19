import Task from "../../models/task.model.js";

// CRUD → Create
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
      console.error("Error creating task:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

// CRUD → Read
export const getTask = async (req, res) => {
  res.send("Task of Santi!");
};

export const getAllTasks = async (req, res) => {
  try {
    const { user_id } = req.body;

    const findAllTasks = await Task.findAll({
      where: {
        user_id: user_id,
      },
    });

    res.set(400).json(findAllTasks);
  } catch (err) {
    console.error("Error searching tasks:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CRUD → Update
export const updateTask = async (req, res) => {
  try {
    const task_id = req.params.id;
    const { title, text, date, state, user_id } = req.body;

    await Task.update(
      { title, text, date, state },
      { where: { task_id: task_id, user_id: user_id } }
    );
    const updateTask = await Task.findOne({ where: { task_id: task_id, user_id: user_id } })
    res.set(200).json(updateTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CRUD → Delete
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.body.user_id;

    const deleteTaks = await Task.destroy({
      where: {
        user_id: user_id,
        task_id: id,
      },
    });

    res.status(200).json(deleteTaks);
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
