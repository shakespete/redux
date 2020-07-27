const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case "FETCH_PROJECTS_STARTED": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_PROJECTS_SUCCEEDED": {
      return {
        ...state,
        isLoading: false,
        projects: action.payload.projects,
      };
    }
    case "FETCH_PROJECTS_FAILED": {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
}
