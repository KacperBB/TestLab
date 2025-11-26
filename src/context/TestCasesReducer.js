export default function testCasesReducer(state, action) {
  switch (action.type) {
    case "load": {
      // nadpisz cały stan nowymi danymi
      return action.payload;
    }

    case "add": {
      // dodaj nowy test do listy
      return [...state, action.payload];
    }

    case "update": {
      const { id, patch } = action.payload;
      return state.map(tc =>
        tc.id === id
          ? { ...tc, ...patch }
          : tc
      );
    }

    case "replaceAll": {
      return action.payload;
    }

    default:
      return state;
  }
}
