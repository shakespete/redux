import { combineReducers } from "redux";
import page from "./page";
import projects from "./projects";
import tasks from "./tasks";

export default combineReducers({
  page,
  projects,
  tasks,
});
