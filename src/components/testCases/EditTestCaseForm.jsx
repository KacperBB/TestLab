import { useState, useEffect } from "react";
import { useTestCases } from "../../context/TestCasesContext";
import "./TestCaseForm.css";

function EditTestCaseForm({ testCase, onClose }) {
    const { updateTestCase } = useTestCases();

    const [id, setId] = useState(testCase.id);
    const [name, setName] = useState(testCase.name);
    const [status, setStatus] = useState(testCase.status);
    const [type, setType] = useState(testCase.type);
    const [expectedResult, setExpectedResult] = useState(testCase.expectedResult);
    const [description, setDescription] = useState(testCase.description || "");
    const [testerName, setTesterName] = useState(testCase.testerName || "");

    // Aktualizacja formularza po zmianie testCase
    useEffect(() => {
        setId(testCase.id);
        setName(testCase.name);
        setStatus(testCase.status);
        setType(testCase.type);
        setExpectedResult(testCase.expectedResult);
        setDescription(testCase.description || "");
        setTesterName(testCase.testerName || "");
    }, [testCase]);

    function handleSubmit(e) {
        e.preventDefault();

        updateTestCase(testCase.id, {
            name,
            status,
            type,
            expectedResult,
            description,
            testerName,
        });

        onClose();
    }

    return (
        <div className="form-overlay">
            <div className="form-container">
                <div className="form-header">
                    <h2 className="form-title">Edytuj Test Case</h2>
                    <button className="close-btn" onClick={onClose} type="button">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="test-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">
                                ID (niemodyfikowalne)
                                <input
                                    type="text"
                                    className="form-input"
                                    value={id}
                                    disabled
                                />
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Nazwa
                                <input 
                                    type="text"
                                    className="form-input"
                                    value={name} 
                                    onChange={e => setName(e.target.value)}
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
                                    rows="4"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-cancel" onClick={onClose}>
                            Anuluj
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Zapisz zmiany
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTestCaseForm;