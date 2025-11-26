import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTestCases } from "../context/TestCasesContext";
import useTestStats from "../hooks/useTestStats";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./DashboardPage.css";

const STATUS_COLORS = {
  passed: "#10b981",
  failed: "#ef4444",
  not_run: "#64748b",
};

const TYPE_COLORS = ["#6366f1", "#a855f7", "#f97316", "#10b981", "#eab308", "#06b6d4", "#8b5cf6", "#ec4899"];

function DashboardPage() {
  const { testCases, loading, error } = useTestCases();
  const stats = useTestStats(testCases);

  const statusData = useMemo(
    () => [
      { name: "Passed", value: stats.passed, key: "passed" },
      { name: "Failed", value: stats.failed, key: "failed" },
      { name: "Not run", value: stats.notRun, key: "not_run" },
    ],
    [stats.passed, stats.failed, stats.notRun]
  );

  const typeData = stats.byType.map((item, index) => ({
    name: item.type,
    value: item.count,
    color: TYPE_COLORS[index % TYPE_COLORS.length],
  }));

  const passRate = stats.total > 0 
    ? ((stats.passed / stats.total) * 100).toFixed(1) 
    : 0;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Ładowanie danych do dashboardu...</p>
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

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Przegląd statystyk testów</p>
        </div>
        <Link to="/test-cases" className="btn btn-primary">
          <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          Zobacz wszystkie testy
        </Link>
      </div>

      <div className="stats-grid">
        <StatCard 
          label="Wszystkie testy" 
          value={stats.total} 
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          }
        />
        <StatCard 
          label="Passed" 
          value={stats.passed} 
          color={STATUS_COLORS.passed}
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          }
        />
        <StatCard 
          label="Failed" 
          value={stats.failed} 
          color={STATUS_COLORS.failed}
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          }
        />
        <StatCard 
          label="Not run" 
          value={stats.notRun} 
          color={STATUS_COLORS.not_run}
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          }
        />
      </div>

      <div className="pass-rate-card">
        <div className="pass-rate-content">
          <div className="pass-rate-label">Wskaźnik sukcesu</div>
          <div className="pass-rate-value">{passRate}%</div>
          <div className="pass-rate-progress">
            <div 
              className="pass-rate-progress-bar" 
              style={{ width: `${passRate}%` }}
            ></div>
          </div>
          <div className="pass-rate-text">
            {stats.passed} z {stats.total} testów zakończonych sukcesem
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2 className="chart-title">Statusy testów</h2>
          <div className="chart-container">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={true}
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={entry.key}
                      fill={STATUS_COLORS[entry.key]}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    color: 'var(--text-primary)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h2 className="chart-title">Testy według typu</h2>
          <div className="chart-container">
            <ResponsiveContainer>
              <BarChart data={typeData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="var(--border)"
                />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--text-secondary)"
                  style={{ fontSize: '0.85rem' }}
                />
                <YAxis 
                  allowDecimals={false} 
                  stroke="var(--text-secondary)"
                  style={{ fontSize: '0.85rem' }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    color: 'var(--text-primary)'
                  }}
                />
                <Bar dataKey="value" name="Liczba testów" radius={[8, 8, 0, 0]}>
                  {typeData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h2 className="section-title">Ostatnie akcje</h2>
        <div className="recent-list">
          {testCases
            .filter(tc => tc.lastRunAt)
            .sort((a, b) => new Date(b.lastRunAt) - new Date(a.lastRunAt))
            .slice(0, 5)
            .map((tc) => (
              <Link 
                key={tc.id} 
                to={`/test-cases/${tc.id}`}
                className="recent-item"
              >
                <div className="recent-info">
                  <div className={`recent-status status-${tc.status}`}>
                    {tc.status === "passed" ? "✓" : tc.status === "failed" ? "✗" : "○"}
                  </div>
                  <div className="recent-details">
                    <div className="recent-name">{tc.name}</div>
                    <div className="recent-meta">
                      <span className="recent-id">{tc.id}</span>
                      <span className="recent-dot">•</span>
                      <span className="recent-time">{tc.lastRunAt}</span>
                    </div>
                  </div>
                </div>
                <svg className="recent-arrow" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon }) {
  return (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-icon" style={{ color: color || 'var(--accent-primary)' }}>
        {icon}
      </div>
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
}

export default DashboardPage;
