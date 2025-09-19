import { RootState } from ".";
import { refreshAccessToken } from "./authSlice";

export const fetchWithRefresh = async (
  url: string,
  options: RequestInit,
  dispatch: any,
  getState: () => RootState
) => {
  let state = getState();
  let token = state.auth.access;

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (res.status === 401) {
    const refreshRes = await dispatch(refreshAccessToken()).unwrap();
    token = refreshRes.access;

    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  }

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};
