const initialPageState = {
  currentProjectId: null,
  searchTerm: "",
};

export default function page(state = initialPageState, action) {
  switch (action.type) {
    case "SET_CURRENT_PROJECT_ID": {
      return {
        ...state,
        currentProjectId: action.payload.id,
      };
    }
    case "FILTER_TASKS": {
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    }
    default: {
      return state;
    }
  }
}
