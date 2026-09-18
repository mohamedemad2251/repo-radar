// To make this clean, we will use the API url/endpoint in the environment.
// NOTE: That means we have to configure Vercel with the environment variable as well for this to work.
const API_URL = import.meta.env.VITE_API_URL;

// Should the API url not be configured, throw this error.
if (!API_URL) throw new Error("VITE_API_URL is not configured.");

export const apiClient = {
  // Using generic type T allows TypeScript to infer the type of each request, helping us to write clean code.
  get: async <T>(path: string): Promise<T> => {
    const response = await fetch(API_URL + path);

    // Guard against failed responses (400's + 500's)
    if (!response.ok)
      throw new Error(
        `Failed to fetch GET request: ${response.status} ${response.statusText}`,
      );

    const data: T = await response.json();

    return data;
  },
};
