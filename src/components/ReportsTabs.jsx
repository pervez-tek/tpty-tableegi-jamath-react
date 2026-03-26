import { useState } from "react";
import "./ReportsTabs.css"

function ReportsTabs() {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
        <div className="card shadow p-1">
            <div className="card-body">

                <h4 className="card-title text-center mb-4">
                    Reports
                </h4>

                {/* Tabs Header */}
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                            onClick={() => setActiveTab("tab1")}
                        >
                            Jamath Report
                        </button>
                    </li>

                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                            onClick={() => setActiveTab("tab2")}
                        >
                            Summary
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
                            onClick={() => setActiveTab("tab3")}
                        >
                            Sehri Report
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}

                {activeTab === "tab1" && (
                    <div>

                        {/* Your Existing Form */}
                        <form className="row g-3 mb-3">

                            <div className="col-md-6">
                                <label className="form-label">
                                    From Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    To Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                />
                            </div>

                            <div className="col-12 d-flex justify-content-center mt-3">

                                <button className="btn btn-primary me-2">
                                    Submit
                                </button>

                                <button className="btn btn-danger">
                                    Reset
                                </button>

                            </div>

                        </form>

                    </div>
                )}

                {activeTab === "tab2" && (
                    <div className="text-center">

                        <h5>Summary Panel</h5>

                        <p>
                            Here you can display summary results,
                            charts, or export options.
                        </p>

                    </div>
                )}

                {activeTab === "tab3" && (
                    <div className="text-center">

                        <h5>Sehri Panel</h5>

                        <div className="accordion accordion-flush" id="reportsAccordion">

                            {/* Panel 1 */}
                            <div className="accordion-item">

                                <h2 className="accordion-header">

                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                    >
                                        Panel 1
                                    </button>

                                </h2>

                                <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse show"
                                    data-bs-parent="#reportsAccordion"
                                >

                                    <div className="accordion-body">

                                       Results content here

                                    </div>

                                </div>

                            </div>

                            {/* Panel 2 */}
                            <div className="accordion-item">

                                <h2 className="accordion-header">

                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                    >
                                         Panel 2
                                    </button>

                                </h2>

                                <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#reportsAccordion"
                                >

                                    <div className="accordion-body">

                                        Results content here

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ReportsTabs;