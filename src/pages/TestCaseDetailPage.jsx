import { useParams, Link, useNavigate } from "react-router-dom";
import { useTestCases } from "../context/TestCasesContext";
import { singleTestCaseToCsv, downloadCsv } from "../utils/csvExport";
import EditTestCaseForm from "../components/testCases/EditTestCaseForm";
import { useState } from "react";
import "./TestCaseDetailPage.css";

function TestCaseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTestCaseById, updateTestCase, deleteTestCase } = useTestCases();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const testCase = getTestCaseById(id);

  if (!testCase) {
    return (
      <div className="detail-container">
        <div className="not-found">
          <svg className="not-found-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <h1>Test case nie znaleziony</h1>
          <Link to="/test-cases" className="btn btn-primary">
            Powrót do listy
          </Link>
        </div>
      </div>
    );
  }

  function handleRunTestPassed() {
    const now = new Date();
    const formatted = now.toLocaleString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');

    updateTestCase(testCase.id, {
      status: "passed",
      lastRunAt: formatted,
    });
  }

  function handleRunTestFailed() {
    const now = new Date();
    const formatted = now.toLocaleString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');

    updateTestCase(testCase.id, {
      status: "failed",
      lastRunAt: formatted,
    });
  }

  function handleDelete() {
    if (window.confirm(`Czy na pewno chcesz usunąć test ${testCase.id}?`)) {
      deleteTestCase(testCase.id);
      navigate("/test-cases");
    }
  }

  function handleExportSingle() {
    const csvString = singleTestCaseToCsv(testCase);
    downloadCsv(`${testCase.id}.csv`, csvString);
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "passed":
        return "✓";
      case "failed":
        return "✗";
      case "not_run":
        return "○";
      default:
        return "○";
    }
  };

  return (
    <div className="detail-container">
      <div className="detail-header">
        <Link to="/test-cases" className="back-link">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Powrót do listy
        </Link>
      </div>

      <div className="detail-content">
        <div className="detail-main">
          <div className="detail-title-section">
            <div className="title-row">
              <h1 className="detail-title">{testCase.name}</h1>
              <div className={`status-badge-large status-${testCase.status}`}>
                <span className="status-icon">{getStatusIcon(testCase.status)}</span>
                <span className="status-text">{testCase.status}</span>
              </div>
            </div>
            <p className="detail-id">{testCase.id}</p>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <div className="info-label">
                <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Typ
              </div>
              <div className="info-value">{testCase.type}</div>
            </div>

            <div className="info-card">
              <div className="info-label">
                <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Ostatnie uruchomienie
              </div>
              <div className="info-value">{testCase.lastRunAt || "Nigdy"}</div>
            </div>

            <div className="info-card">
              <div className="info-label">
                <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Tester
              </div>
              <div className="info-value">{testCase.testerName || "Nie przypisano"}</div>
            </div>
          </div>

          <div className="detail-section">
            <h2 className="section-title">Opis</h2>
            <div className="section-content">
              <p>{testCase.description || "Brak opisu"}</p>
            </div>
          </div>

          <div className="detail-section">
            <h2 className="section-title">Oczekiwany rezultat</h2>
            <div className="section-content expected-result">
              <svg className="expected-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p>{testCase.expectedResult}</p>
            </div>
          </div>
        </div>

        <div className="detail-sidebar">
          <div className="action-section">
            <h3 className="action-title">Akcje</h3>
            
            <button className="action-btn btn-run-pass" onClick={handleRunTestPassed}>
              <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Uruchom (PASS)
            </button>

            <button className="action-btn btn-run-fail" onClick={handleRunTestFailed}>
              <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Uruchom (FAIL)
            </button>

            <button className="action-btn btn-edit" onClick={() => setIsEditOpen(true)}>
              <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edytuj test
            </button>

            <button className="action-btn btn-export" onClick={handleExportSingle}>
              <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Eksportuj CSV
            </button>

            <button className="action-btn btn-delete" onClick={handleDelete}>
              <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Usuń test
            </button>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <EditTestCaseForm
          testCase={testCase}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
}

export default TestCaseDetailsPage;
