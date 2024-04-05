import { createAsyncThunk } from "@reduxjs/toolkit";
import { Project, ProjectCreatePayload } from "../types/Project";
import { axiosInstance } from "../services/axiosInstance";
import { Collaborator } from "./Collaborator";

export const createProject = createAsyncThunk<Project, ProjectCreatePayload>(
  "project/create",
  async ({ title, description, creator }) => {
    console.log("CREATE PROJECT PAYLOAD ", {
      title,
      description,
      creator: creator.id,
    });
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

export const collaborate = createAsyncThunk<
  Collaborator,
  { artistId: number; projectId: number }
>("collaborator/create", async ({ artistId, projectId }) => {
  const response = await axiosInstance.post(`/api/collaborators/`, {
    artist: artistId,
    project: projectId,
  });
  console.log("COLLABORATOR", { artistId, projectId });
  return response.data as Collaborator;
});

export const fetchCollaborators = createAsyncThunk<Collaborator[]>(
  "collaborators/fetch",
  async () => {
    const response = await axiosInstance.get(`/api/collaborators/`);

    return response.data as Collaborator[];
  }
);

export const fetchArtistCollabProjects = createAsyncThunk<Collaborator[]>(
  "artist/collaborations/fetch",
  async () => {
    const response = await axiosInstance.get(`/api/collaborators/me/`);

    console.log("MY COLLABS == ", response.data);

    return response.data as Collaborator[];
  }
);
