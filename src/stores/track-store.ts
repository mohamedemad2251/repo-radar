import { getRepository } from "@/services/repositories";
import type { Repository } from "@/types/types";
import { create } from "zustand";

type IdleState = {
  status: "idle";
  error: null;
};

type LoadingState = {
  status: "loading";
  error: null;
};

type ErrorState = {
  status: "error";
  error: string;
};

type RefreshState = IdleState | LoadingState | ErrorState;

type TrackedReposStore = {
  trackedRepos: Repository[];
  addTrackedRepo: (trackedRepo: Repository) => void;
  removeTrackedRepo: (trackedRepoId: Repository["id"]) => void;
  refreshTrackedRepo: (trackedRepoId: Repository["id"]) => Promise<void>;
  statusById: Partial<Record<Repository["id"], RefreshState>>;
};

// The setter sets the state object with whatever we want, while the getter gets the current object value in the store.
export const useTracksStore = create<TrackedReposStore>((set, get) => ({
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
    set((state) => {
      const updatedStatusById = { ...state.statusById };
      delete updatedStatusById[trackedRepoId];
      return {
        trackedRepos: state.trackedRepos.filter(
          (repo) => repo.id !== trackedRepoId,
        ),
        statusById: updatedStatusById,
      };
    }),

  // Logic: Get the current trackedRepos via get() -> Find the correct id -> Use /repos/{owner}/{name} API -> Update that specific repo via set()
  refreshTrackedRepo: async (trackedRepoId) => {
    const trackedRepo = get().trackedRepos.find(
      (repo) => repo.id === trackedRepoId,
    );
    if (!trackedRepo) return;

    // Should a repo be already refreshing, wait for it to finish first. Then you can refresh again
    if (get().statusById[trackedRepoId]?.status === "loading") {
      return;
    }

    // Set loading state to true (for this specific repo)
    set((state) => ({
      statusById: {
        ...state.statusById,
        [trackedRepoId]: {
          status: "loading",
          error: null,
        },
      },
    }));

    try {
      const data = await getRepository(trackedRepo.full_name);
      if (!data) {
        throw new Error("Repository data was not returned.");
      }
      // Since data exists, remove loading and remove this statusById (idle will be handled as the fallback option, only errors/loading will be registered)
      set((state) => {
        // States should be immutable, so it's important to make a copy before removal
        const updatedStatusById = { ...state.statusById };
        delete updatedStatusById[trackedRepoId];
        return {
          trackedRepos: state.trackedRepos.map((repo) =>
            repo.id === data.id ? data : repo,
          ),
          statusById: updatedStatusById,
        };
      });
    } catch (error) {
      // Set error state to true (for this specific repo)
      set((state) => ({
        statusById: {
          ...state.statusById,
          [trackedRepoId]: {
            status: "error",
            error:
              error instanceof Error
                ? error.message
                : "Failed to refresh repository",
          },
        },
      }));
    }
  },
  // No trackedRepos added at first so no status logged
  statusById: {},
}));
