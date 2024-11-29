// src/redux/selectors.js
export const selectFilteredTasks = (state) => {
    const { tasks, filters } = state.tasks;
    const { shift, sort } = filters;
  
    // Filter by shift
    let filteredTasks = tasks.filter(
      (task) => shift === "All" || task.shift === shift
    );
  
    // Sort by priority or status
    filteredTasks = filteredTasks.sort((a, b) => {
      if (sort === "Priority") {
        const priorityOrder = ["High", "Medium", "Low"];
        return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
      } else if (sort === "Status") {
        const statusOrder = ["Pending", "Completed"];
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      }
      return 0;
    });
  
    return filteredTasks;
  };
  