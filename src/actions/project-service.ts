import { createAsyncThunk } from "@reduxjs/toolkit";
import { Project, ProjectCreatePayload } from "../types/Project";
import { axiosInstance } from "../services/axiosInstance";

export const createProject = createAsyncThunk<Project, ProjectCreatePayload>(
  "project/create",
  async ({ title, description, creator }) => {
    const response = await axiosInstance.post("/api/projects/", {
      title,
      description,
      creator: creator.id,
    });

    return response.data as Project;
  }
);

export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetch",
  async () => {
    const response = await axiosInstance.get(`/api/projects/`);

    return response.data as Project[];
  }
);
