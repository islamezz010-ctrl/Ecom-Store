// src/context/AdminContext.jsx
import { createContext, useContext, useReducer, useCallback } from "react";

const AdminContext = createContext();

const initialState = {
  filters: {
    page: 1,
    limit: 20,
    search: "",
    status: "",
    category: "",
  },
  sorting: {
    sortBy: "-createdAt",
  },
  ui: {
    isLoading: false,
    error: null,
    success: null,
  },
};

function adminReducer(state, action) {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value },
      };
    case "SET_PAGE":
      return {
        ...state,
        filters: { ...state.filters, page: action.value },
      };
    case "SET_SORT":
      return {
        ...state,
        sorting: { ...state.sorting, sortBy: action.value },
      };
    case "SET_LOADING":
      return {
        ...state,
        ui: { ...state.ui, isLoading: action.value },
      };
    case "SET_ERROR":
      return {
        ...state,
        ui: { ...state.ui, error: action.value },
      };
    case "SET_SUCCESS":
      return {
        ...state,
        ui: { ...state.ui, success: action.value },
      };
    case "RESET_FILTERS":
      return {
        ...state,
        filters: initialState.filters,
      };
    default:
      return state;
  }
}

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const setFilter = useCallback((key, value) => {
    dispatch({ type: "SET_FILTER", key, value });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({ type: "SET_PAGE", value: page });
  }, []);

  const setSort = useCallback((sortBy) => {
    dispatch({ type: "SET_SORT", value: sortBy });
  }, []);

  const setLoading = useCallback((isLoading) => {
    dispatch({ type: "SET_LOADING", value: isLoading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: "SET_ERROR", value: error });
  }, []);

  const setSuccess = useCallback((success) => {
    dispatch({ type: "SET_SUCCESS", value: success });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const value = {
    state,
    setFilter,
    setPage,
    setSort,
    setLoading,
    setError,
    setSuccess,
    resetFilters,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
