import { useState } from "react";
import { useTestCases } from "../../context/TestCasesContext";
import "./TestCaseForm.css";

function AddTestCaseForm() {
  const { AddTestCase, testCases } = useTestCases();
  const [isOpen, setIsOpen] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("not_run");
  const [type, setType] = useState("identification");
  const [expectedResult, setExpectedResult] = useState("");
  const [testerName, setTesterName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // prosta walidacja
    if (!id.trim() || !name.trim()) {
      setError("ID i nazwa są wymagane.");
      return;
    }

    // sprawdzenie unikalności ID
    const exists = testCases.some(tc => tc.id === id);
    if (exists) {
      setError("Test o takim ID już istnieje.");
      return;
    }

    const newTest = {
      id,
      name,
      status,
      type,
      expectedResult,
      description,
      lastRunAt: null,
      testerName,
    };

   AddTestCase(newTest);

    // reset pól
    setId("");
    setName("");
    setStatus("not_run");
    setType("identification");
    setExpectedResult("");
    setDescription("");
    setTesterName("");
    setError("");
    setIsOpen(false);
  }

  if (!isOpen) {
    return (
      <div style={{ marginBottom: "2rem" }}>
        <button 
          className="btn btn-primary btn-large"
          onClick={() => setIsOpen(true)}
        >
          <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Dodaj nowy test case
        </button>
      </div>
    );
  }

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">Dodaj nowy test case</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)} type="button">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="form-error">
            <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="test-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                ID *
                <input
                  type="text"
                  className="form-input"
                  value={id}
                  onChange={e => setId(e.target.value)}
                  placeholder="TC-XXX"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Nazwa *
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Nazwa testu"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Status
                <select
                  className="form-select"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="not_run">Not run</option>
                  <option value="passed">Passed</option>
                  <option value="failed">Failed</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Typ
                <select
                  className="form-select"
                  value={type}
                  onChange={e => setType(e.target.value)}
                >
                  <option value="identification">Identification</option>
                  <option value="wlan">WLAN</option>
                  <option value="dtc">DTC</option>
                  <option value="session">Session</option>
                  <option value="security">Security</option>
                  <option value="write">Write</option>
                  <option value="routine">Routine</option>
                  <option value="sensor">Sensor</option>
                  <option value="reset">Reset</option>
                  <option value="communication">Communication</option>
                  <option value="control">Control</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Expected Result
                <input
                  type="text"
                  className="form-input"
                  value={expectedResult}
                  onChange={e => setExpectedResult(e.target.value)}
                  placeholder="Oczekiwany rezultat"
                />
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                Tester Name
                <input
                  type="text"
                  className="form-input"
                  value={testerName}
                  onChange={e => setTesterName(e.target.value)}
                  placeholder="Imię i nazwisko"
                />
              </label>
            </div>

            <div className="form-group form-group-full">
              <label className="form-label">
                Opis
                <textarea
                  className="form-textarea"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Szczegółowy opis testu..."
                  rows="4"
                />
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-cancel" onClick={() => setIsOpen(false)}>
              Anuluj
            </button>
            <button type="submit" className="btn btn-primary">
              <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Dodaj test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTestCaseForm;
