// CRUD → Create
export const createTask = async (req, res) => {
  res.send("Create task of Santi");
};

// CRUD → Read
export const getTask = async (req, res) => {
  res.send("Task of Santi!");
};

export const getAllTasks = async (req, res) => {
  res.send("All tasks of Santi!");
};

// CRUD → Update
export const updateTask = async (req, res) => {
  res.send("Update task of Santi");
};

// CRUD → Delete
export const deleteTask = async (req, res) => {
  res.send("Delete task of Santi");
};
