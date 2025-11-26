import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTestCases } from "../context/TestCasesContext";
import { testCasesToCsv, downloadCsv } from "../utils/csvExport";
import { parseTestCasesCsv } from "../utils/csvImport";
import AddTestCaseForm from "../components/testCases/AddTestCaseForm";
import useFilteredTests from "../hooks/useFilteredTests";
import useDebouncedValue from "../hooks/useDebouncedValue";
import usePagination from "../hooks/usePagination";
import "./TestCasesPage.css";

function TestCasesPage() {
  const { testCases, loading, error, replaceAllTestCases, updateTestCase } = useTestCases();

  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const searchInputRef = useRef(null);
  const debouncedSearch = useDebouncedValue(searchTerm, 300);

  const filteredAndSorted = useFilteredTests(
    testCases,
    statusFilter,
    sortBy,
    debouncedSearch,
    typeFilter
  );

  const {
    currentPage,
    pageCount,
    currentItems,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(filteredAndSorted, pageSize);

  const handleExportCsv = useCallback(() => {
    const csvString = testCasesToCsv(testCases);
    downloadCsv("test-cases.csv", csvString);
  }, [testCases]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Ładowanie testów...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Błąd: {error}</p>
      </div>
    );
  }

  function handleImportCsv(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      try {
        const imported = parseTestCasesCsv(text);
        replaceAllTestCases(imported);
      } catch (err) {
        alert("Error: " + err.message);
      }
    };

    reader.readAsText(file);
  }

  function handleReset() {
    replaceAllTestCases(testCases);
    localStorage.setItem("testCases", JSON.stringify(testCases));
  }

  const handleRunAllVisiblePass = () => {
    filteredAndSorted.forEach((tc) => {
      updateTestCase(tc.id, {
        status: "passed",
        lastRunAt: new Date().toISOString(),
      });
    });
  };

  const handleRunAllVisibleFail = () => {
    filteredAndSorted.forEach((tc) => {
      updateTestCase(tc.id, {
        status: "failed",
        lastRunAt: new Date().toISOString(),
      });
    });
  };

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

  const stats = {
    total: testCases.length,
    passed: testCases.filter((tc) => tc.status === "passed").length,
    failed: testCases.filter((tc) => tc.status === "failed").length,
    notRun: testCases.filter((tc) => tc.status === "not_run").length,
  };

  return (
    <div className="test-cases-container">
      <header className="page-header">
        <h1 className="page-title">Test Cases</h1>
        <p className="page-subtitle">
          {filteredAndSorted.length} z {testCases.length} testów
        </p>
      </header>
      <button
      onClick={() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }}
      style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
          Skocz do wyszukiwarki
      </button>

      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Wszystkie</div>
        </div>
        <div className="stat-card stat-passed">
          <div className="stat-value">{stats.passed}</div>
          <div className="stat-label">Passed</div>
        </div>
        <div className="stat-card stat-failed">
          <div className="stat-value">{stats.failed}</div>
          <div className="stat-label">Failed</div>
        </div>
        <div className="stat-card stat-not-run">
          <div className="stat-value">{stats.notRun}</div>
          <div className="stat-label">Not Run</div>
        </div>
      </div>

      <div className="controls-section">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="search-input"
            ref={searchInputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Szukaj po nazwie..."
          />
        </div>

        <div className="filters">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Wszystkie statusy</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
            <option value="not_run">Not run</option>
          </select>

          <select
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">Wszystkie typy</option>
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

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Po nazwie</option>
            <option value="lastRunAt">Po ostatnim uruchomieniu</option>
          </select>
        </div>

        <div className="action-buttons">
          <button className="btn btn-secondary" onClick={handleExportCsv}>
            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Eksport CSV
          </button>

          <label className="btn btn-secondary">
            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Import CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCsv}
              style={{ display: "none" }}
            />
          </label>

          <button className="btn btn-secondary" onClick={handleReset}>
            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Reset
          </button>

          <button className="btn btn-secondary" onClick={handleRunAllVisiblePass}>
            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Oznacz wszystkie widoczne jako PASSED
          </button>

            <button className="btn btn-secondary" onClick={handleRunAllVisibleFail}>
            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Oznacz wszystkie widoczne jako FAILED
          </button>
        </div>
      </div>

      <AddTestCaseForm />

      <div className="test-list">
        {currentItems.length === 0 ? (
          <div className="empty-state">
            <p>Brak testów spełniających kryteria</p>
          </div>
        ) : (
          currentItems.map((tc, index) => (
            <Link
              key={tc.id}
              to={`/test-cases/${tc.id}`}
              className="test-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="test-card-header">
                <div className={`status-badge status-${tc.status}`}>
                  <span className="status-icon">{getStatusIcon(tc.status)}</span>
                  <span className="status-text">{tc.status}</span>
                </div>
                <span className="test-type">{tc.type}</span>
              </div>

              <div className="test-card-body">
                <h3 className="test-id">{tc.id}</h3>
                <p className="test-name">{tc.name}</p>
                <p className="test-description">{tc.description}</p>
              </div>

              <div className="test-card-footer">
                <div className="test-meta">
                  <svg className="meta-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{tc.lastRunAt || "Nigdy"}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <div className="pagination">
        <div className="pagination-info">
          <span>
            Strona {currentPage} z {pageCount || 1}
          </span>
          <select
            className="page-size-select"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={5}>5 / strona</option>
            <option value={10}>10 / strona</option>
            <option value={25}>25 / strona</option>
          </select>
        </div>

        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            ←
          </button>

          {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
            let pageNum;
            if (pageCount <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= pageCount - 2) {
              pageNum = pageCount - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                className={`pagination-btn ${currentPage === pageNum ? "active" : ""}`}
                onClick={() => goToPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            className="pagination-btn"
            onClick={nextPage}
            disabled={currentPage === pageCount}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestCasesPage;
