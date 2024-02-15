import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../types/Project";
import { createProject, fetchProjects } from "../../actions/project-service";

interface projectSliceState {
  loading: boolean;
  projects: Project[];
  error: string | unknown;
}

export const projectSlice = createSlice({
  name: "project",
  initialState: <projectSliceState>{ loading: false, projects: [], error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
