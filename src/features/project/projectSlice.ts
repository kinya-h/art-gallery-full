import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../types/Project";
import {
  collaborate,
  createProject,
  fetchArtistCollabProjects,
  fetchCollaborators,
  fetchProjects,
} from "../../actions/project-service";
import { Collaborator } from "../../actions/Collaborator";

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

interface collaborateState {
  loading: boolean;
  collaborators: Collaborator[];
  error: string | unknown;
}

export const CollaborateSlice = createSlice({
  name: "collaborators",
  initialState: <collaborateState>{
    loading: false,
    collaborators: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(collaborate.pending, (state) => {
        state.loading = true;
      })
      .addCase(collaborate.fulfilled, (state, action) => {
        state.loading = false;
        state.collaborators.push(action.payload);
      })
      .addCase(collaborate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCollaborators.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCollaborators.fulfilled, (state, action) => {
        state.loading = false;
        state.collaborators = action.payload;
      })
      .addCase(fetchCollaborators.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

interface artistCollabProjectsState {
  loading: boolean;
  artistCollabProjects: Collaborator[];
  error: string | unknown;
}
export const artistCollabProjectsSlice = createSlice({
  name: "artistcollabs",
  initialState: <artistCollabProjectsState>{
    loading: false,
    artistCollabProjects: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistCollabProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtistCollabProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.artistCollabProjects = action.payload;
      })
      .addCase(fetchArtistCollabProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
