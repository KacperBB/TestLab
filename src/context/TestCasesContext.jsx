// src/context/TestCasesContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { testCases as initialTestCases } from "../data/testCases";
import testCasesReducer from "./TestCasesReducer";

const TestCasesContext = createContext(null);

export function TestCasesProvider({ children }) {
  const [testCases, dispatch] = useReducer(testCasesReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Wczytanie danych po starcie aplikacji
  useEffect(() => {
    try{
      const saved = localStorage.getItem("testCases");
      if (saved) {
        dispatch({ type: "load", payload: JSON.parse(saved) });
      } else {
        dispatch({ type: "load", payload: initialTestCases });
      }
    } catch (e) {
      console.error("Error loading test cases from localStorage:", e);
      setError("Failed to load test cases.");
      dispatch({ type: "load", payload: initialTestCases });
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Zapisywanie danych przy każdej zmianie
  useEffect(() => {
    if (testCases.length > 0) {
      localStorage.setItem("testCases", JSON.stringify(testCases));
    }
  }, [testCases]);

  // helpery do dispatchowania akcji:

  function loadTestCases(data) {
    dispatch({ type: "load", payload: data });
  }

  function replaceAllTestCases(newTestCases) {
    dispatch({ type: "replaceAll", payload: newTestCases });
  }

  function getTestCaseById(id) {
    return testCases.find((tc) => tc.id === id);
  }

  function AddTestCase(testCase) {
    dispatch({ type: "add", payload: testCase });
  }

  function updateTestCase(id, patch) {
    dispatch({ type: "update", payload: { id, patch } });
  }

  const value = {
    testCases,
    loading,
    error,
    loadTestCases,
    replaceAllTestCases,
    getTestCaseById,
    AddTestCase,
    updateTestCase,
  };

  return (
    <TestCasesContext.Provider value={value}>
      {children}
    </TestCasesContext.Provider>
  );
}

export function useTestCases() {
  const ctx = useContext(TestCasesContext);
  if (!ctx) throw new Error("useTestCases must be inside provider");
  return ctx;
}
