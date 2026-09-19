import type { Repository } from "@/types/types";
import { create } from "zustand";

type TrackedReposStore = {
  trackedRepos: Repository[];
  addTrackedRepo: (trackedRepo: Repository) => void;
  removeTrackedRepo: (trackedRepoId: Repository["id"]) => void;
};

export const useTracksStore = create<TrackedReposStore>((set) => ({
  trackedRepos: [],
  addTrackedRepo: (trackedRepo) =>
    set((state) => ({
      trackedRepos: state.trackedRepos.some(
        (repo) => repo.id === trackedRepo.id,
      )
        ? state.trackedRepos
        : [...state.trackedRepos, trackedRepo],
    })),
  removeTrackedRepo: (trackedRepoId) =>
    set((state) => ({
      trackedRepos: state.trackedRepos.filter(
        (repo) => repo.id !== trackedRepoId,
      ),
    })),
}));
