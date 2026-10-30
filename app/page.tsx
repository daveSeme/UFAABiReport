
"use client";

import { useMemo, useState } from "react";
import {
  Activity, AlertCircle, ArrowDownToLine, BarChart3,
  BriefcaseBusiness, Building2, CalendarDays, Check,
  CheckCircle2, ClipboardCheck, Database, FileCheck2,
  FileText, LayoutDashboard, Search, ShieldCheck, Wallet
} from "lucide-react";

type Status =
  | "Done"
  | "Awaiting Approval"
  | "Awaiting Feedback"
  | "Awaiting Confirmation";

type Task = {
  id: number;
  group: string;
  name: string;
  status: Status;
  progress?: number;
  remark: string;
};

const tasks: Task[] = [
  {id:1,group:"Financial Reports",name:"Statement of Financial Position",status:"Awaiting Approval",progress:80,remark:"Technical development completed to the agreed scope. Pending Finance review, validation of statement balances and classifications, and formal approval."},
  {id:2,group:"Financial Reports",name:"Financial Performance Statement",status:"Done",remark:"Financial performance reporting implementation completed."},
  {id:3,group:"Financial Reports",name:"Cash Flow Statements",status:"Done",remark:"Cash flow reporting implementation completed."},
  {id:4,group:"Financial Reports",name:"Trial Balance",status:"Awaiting Feedback",progress:80,remark:"Implementation ready for Finance review. Awaiting feedback on balances, account mapping and reconciliation presentation."},
  {id:5,group:"Financial Reports",name:"General Ledger Reports",status:"Done",remark:"General ledger reporting delivered."},
  {id:6,group:"Financial Reports",name:"Bank Reconciliation Reports",status:"Awaiting Confirmation",progress:90,remark:"Report developed and available for review. Pending Finance confirmation of reconciliation outputs and formal sign-off."},
  {id:7,group:"Financial Reports",name:"End-Year Financial Statements",status:"Done",remark:"End-year financial statement reporting completed."},

  {id:8,group:"Budgeting & Utilisation",name:"Annual Budget Reports",status:"Done",remark:"Annual budget reporting delivered."},
  {id:9,group:"Budgeting & Utilisation",name:"Budget vs Actual Reports",status:"Done",remark:"Budget versus actual reporting delivered."},
  {id:10,group:"Budgeting & Utilisation",name:"Departmental Budget Utilisation Reports",status:"Done",remark:"Departmental budget utilisation reporting delivered."},
  {id:11,group:"Budgeting & Utilisation",name:"Variance Analysis Reports",status:"Awaiting Feedback",remark:"Awaiting Finance feedback on variance interpretation and final presentation. No official completion percentage assigned."},
  {id:12,group:"Budgeting & Utilisation",name:"Commitment and Expenditure Tracking Reports",status:"Done",remark:"Commitment and expenditure tracking report delivered."},

  {id:13,group:"Management & Operations",name:"Monthly Financial Reports",status:"Done",remark:"Monthly financial reporting delivered."},
  {id:14,group:"Management & Operations",name:"Quarterly Financial Reports",status:"Done",remark:"Quarterly financial reporting delivered."},
  {id:15,group:"Management & Operations",name:"Revenue and Expenditure Reports",status:"Done",remark:"Revenue and expenditure reporting delivered."},
  {id:16,group:"Management & Operations",name:"Procurement and Payment Reports",status:"Done",remark:"Procurement and payment reporting completed."},
  {id:17,group:"Management & Operations",name:"Executive and Management Dashboards",status:"Done",remark:"Dashboards completed and shared. Additional user access can be provided on request; this is an access and rollout activity, not outstanding development."},
  {id:18,group:"Management & Operations",name:"Audit and Compliance Reports",status:"Done",remark:"Audit and compliance reporting enhancement to the existing dashboard completed."},

  {id:19,group:"Dashboard & Analytics",name:"Interactive dashboards and visualisations",status:"Done",remark:"Interactive dashboard visuals delivered."},
  {id:20,group:"Dashboard & Analytics",name:"KPI monitoring and trend analysis",status:"Done",remark:"KPI monitoring and trend analysis delivered."},
  {id:21,group:"Dashboard & Analytics",name:"Drill-down and drill-through",status:"Done",remark:"Drill-down and drill-through navigation delivered."},
  {id:22,group:"Dashboard & Analytics",name:"Real-time or scheduled refresh",status:"Done",remark:"Refresh capability configured. Credential monitoring and refresh governance remain operational controls."},
  {id:23,group:"Dashboard & Analytics",name:"Configurable reporting templates",status:"Done",remark:"Configurable reporting templates delivered."},
  {id:24,group:"Dashboard & Analytics",name:"Professionally formatted statutory, audit, board and management outputs",status:"Done",remark:"Professionally formatted reporting outputs delivered."},
];

const navigation = [
  {label:"Overview",id:"overview",icon:LayoutDashboard},
  {label:"Requirements",id:"requirements",icon:ClipboardCheck},
  {label:"Finance approvals",id:"approvals",icon:FileCheck2},
  {label:"Operations",id:"operations",icon:BriefcaseBusiness},
  {label:"Technical delivery",id:"technical",icon:Database},
  {label:"Claims reporting",id:"claims",icon:Wallet},
];

const streams = [
  {name:"Financial Reports",count:7,progress:86},
  {name:"Budgeting & Utilisation",count:5,progress:80},
  {name:"Management & Operations",count:6,progress:100},
  {name:"Dashboard & Analytics",count:6,progress:100},
];

function statusStyle(status: Status) {
  if (status === "Done") return "done";
  if (status === "Awaiting Feedback") return "feedback";
  return "approval";
}

export default function Home() {
  const [active, setActive] = useState("overview");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [groupFilter, setGroupFilter] = useState("All workstreams");

  const done = tasks.filter(t => t.status === "Done").length;
  const finalisation = tasks.filter(t =>
    t.status === "Awaiting Approval" ||
    t.status === "Awaiting Confirmation"
  ).length;
  const feedback = tasks.filter(t => t.status === "Awaiting Feedback").length;

  const filtered = useMemo(() => tasks.filter(t =>
    (t.name + " " + t.remark + " " + t.group)
      .toLowerCase().includes(query.toLowerCase()) &&
    (statusFilter === "All statuses" || t.status === statusFilter) &&
    (groupFilter === "All workstreams" || t.group === groupFilter)
  ), [query, statusFilter, groupFilter]);

  function jump(id: string) {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function exportCsv() {
    const rows = [
      ["ID","Workstream","Requirement","Status","Progress","Technical remarks"],
      ...filtered.map(t => [
        t.id,
        t.group,
        t.name,
        t.status,
        t.progress == null ? "Not specified" : `${t.progress}%`,
        t.remark
      ])
    ];

    const csv = rows.map(row =>
      row.map(value =>
        `"${String(value).replaceAll('"','""')}"`
      ).join(",")
    ).join("\n");

    const url = URL.createObjectURL(
      new Blob([csv], {type:"text/csv;charset=utf-8;"})
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "UFAA-requirements-register.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="app-shell">

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">U</div>
          <div>
            <div className="brand-name">UFAA</div>
            <div className="brand-sub">REPORTING INTELLIGENCE</div>
          </div>
        </div>

        <div className="nav-label">WORKSPACE</div>

        <nav className="nav-list">
          {navigation.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-link ${active === item.id ? "active" : ""}`}
                onClick={() => jump(item.id)}
              >
                <Icon size={16}/>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <strong>PROJECT DELIVERY REPORT</strong>
          <span>
            October 2026 edition<br/>
            Prepared for management review
          </span>
        </div>
      </aside>

      <main className="main">

        <div className="topbar">
          <div className="crumb">
            UFAA / <b>Financial Reporting Programme</b>
          </div>
          <div className="top-actions">
            <span className="edition">OCTOBER 2026 EDITION</span>
            <div className="avatar">DS</div>
          </div>
        </div>

        <section className="hero" id="overview">
          <div className="eyebrow">Financial reporting programme</div>

          <h1>
            Clarity in numbers.<br/>
            <span>Confidence in decisions.</span>
          </h1>

          <p className="hero-copy">
            Power BI financial reporting, analytics and management
            visibility — delivery status, technical implementation
            and outstanding Finance review actions.
          </p>

          <div className="hero-footer">
            <div className="prepared">
              <div className="prepared-icon">
                <CalendarDays size={17}/>
              </div>
              <div>
                <small>Report prepared by</small>
                <strong>
                  David Seme · Data Engineer · Loci Africa Technologies
                </strong>
              </div>
            </div>
            <div className="date-chip">
              REPORT DATE · 30 OCT 2026
            </div>
          </div>
        </section>

        <div className="kpi-grid">
          <div className="kpi">
            <div className="kpi-top">
              Project-level progress
              <span className="kpi-icon"><Activity size={15}/></span>
            </div>
            <div className="kpi-value">95%</div>
            <div className="kpi-foot">
              Management-reported estimate
            </div>
          </div>

          <div className="kpi">
            <div className="kpi-top">
              Requirements completed
              <span className="kpi-icon"><CheckCircle2 size={15}/></span>
            </div>
            <div className="kpi-value">
              {done} <span style={{fontSize:14,color:"#8291a8"}}>/ 24</span>
            </div>
            <div className="kpi-foot">83.3% fully completed</div>
          </div>

          <div className="kpi">
            <div className="kpi-top">
              Finalisation / confirmation
              <span className="kpi-icon"><FileCheck2 size={15}/></span>
            </div>
            <div className="kpi-value">{finalisation}</div>
            <div className="kpi-foot">Awaiting Finance review or sign-off</div>
          </div>

          <div className="kpi">
            <div className="kpi-top">
              Awaiting feedback
              <span className="kpi-icon"><AlertCircle size={15}/></span>
            </div>
            <div className="kpi-value">{feedback}</div>
            <div className="kpi-foot">Finance input required to close</div>
          </div>
        </div>

        <div className="section-head">
          <div>
            <div className="section-kicker">Delivery snapshot</div>
            <h2>Programme performance</h2>
            <p>Requirement-level delivery position across four workstreams.</p>
          </div>
        </div>

        <div className="grid-two">
          <div className="panel">
            <div className="panel-title">
              <h3>Requirement status distribution</h3>
              <span>24 official requirements</span>
            </div>

            <div className="progress-layout">
              <div className="ring">
                <svg viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="49" fill="none"
                    stroke="#29374c" strokeWidth="10"/>
                  <circle cx="60" cy="60" r="49" fill="none"
                    stroke="#69d4a2" strokeWidth="10"
                    strokeDasharray={`${done / 24 * 307.9} 307.9`}
                    strokeLinecap="round"/>
                  <circle cx="60" cy="60" r="49" fill="none"
                    stroke="#efbd70" strokeWidth="10"
                    strokeDasharray={`${finalisation / 24 * 307.9} 307.9`}
                    strokeDashoffset={`${-done / 24 * 307.9}`}
                    strokeLinecap="round"/>
                  <circle cx="60" cy="60" r="49" fill="none"
                    stroke="#83aefb" strokeWidth="10"
                    strokeDasharray={`${feedback / 24 * 307.9} 307.9`}
                    strokeDashoffset={`${-(done + finalisation) / 24 * 307.9}`}
                    strokeLinecap="round"/>
                </svg>
                <div className="ring-center">
                  <strong>24</strong>
                  <span>Requirements</span>
                </div>
              </div>

              <div className="legend">
                <div className="legend-row">
                  <span className="legend-left">
                    <i className="dot" style={{"--dot":"#69d4a2"} as React.CSSProperties}/>
                    Completed
                  </span>
                  <strong>20 · 83.3%</strong>
                </div>
                <div className="legend-row">
                  <span className="legend-left">
                    <i className="dot" style={{"--dot":"#efbd70"} as React.CSSProperties}/>
                    Finalisation
                  </span>
                  <strong>3 · 12.5%</strong>
                </div>
                <div className="legend-row">
                  <span className="legend-left">
                    <i className="dot" style={{"--dot":"#83aefb"} as React.CSSProperties}/>
                    Feedback
                  </span>
                  <strong>1 · 4.2%</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">
              <h3>Workstream delivery</h3>
              <span>24 requirements</span>
            </div>

            <div className="workstream-list">
              {streams.map(stream => (
                <div className="workstream" key={stream.name}>
                  <label>{stream.name}</label>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{width:`${stream.progress}%`}}
                    />
                  </div>
                  <b>{stream.count}</b>
                </div>
              ))}
            </div>

            <div className="notice">
              <AlertCircle size={15}/>
              <div>
                <strong>Finance review remains the key closure dependency</strong>
                <p>
                  Three reports require final review or confirmation.
                  Variance Analysis is awaiting Finance feedback; its
                  percentage is intentionally not stated.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section id="requirements">
          <div className="section-head">
            <div>
              <div className="section-kicker">Official register · 24 items</div>
              <h2>Requirements tracker</h2>
              <p>Search, filter and export the official requirement register.</p>
            </div>
          </div>

          <div className="toolbar">
            <div className="search">
              <Search size={14}/>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search requirements or technical remarks..."
              />
            </div>

            <select
              value={groupFilter}
              onChange={e => setGroupFilter(e.target.value)}
            >
              <option>All workstreams</option>
              {streams.map(s => <option key={s.name}>{s.name}</option>)}
            </select>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option>All statuses</option>
              <option>Done</option>
              <option>Awaiting Approval</option>
              <option>Awaiting Confirmation</option>
              <option>Awaiting Feedback</option>
            </select>

            <button className="export-btn" onClick={exportCsv}>
              <ArrowDownToLine size={13}/> Export CSV
            </button>
          </div>

          <div className="task-summary">
            <span className="summary-pill">Total <b>24</b></span>
            <span className="summary-pill">Done <b>{done}</b></span>
            <span className="summary-pill">Finalisation <b>{finalisation}</b></span>
            <span className="summary-pill">Feedback <b>{feedback}</b></span>
            <span className="summary-pill">Showing <b>{filtered.length}</b></span>
          </div>

          <div className="table-wrap">
            <table className="task-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Requirement</th>
                  <th>Workstream</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Technical delivery / remarks</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(task => (
                  <tr key={task.id}>
                    <td>{String(task.id).padStart(2,"0")}</td>
                    <td>
                      <div className="task-name">
                        {task.status === "Done" && (
                          <Check
                            size={12}
                            style={{
                              color:"#69d4a2",
                              marginRight:5,
                              verticalAlign:"middle"
                            }}
                          />
                        )}
                        {task.name}
                      </div>
                    </td>
                    <td>{task.group}</td>
                    <td>
                      <span className={`status ${statusStyle(task.status)}`}>
                        {task.status === "Done"
                          ? <CheckCircle2 size={12}/>
                          : task.status === "Awaiting Feedback"
                          ? <AlertCircle size={12}/>
                          : <FileCheck2 size={12}/>}
                        {task.status}
                      </span>
                    </td>
                    <td>
                      {task.progress == null ? "—" : `${task.progress}%`}
                    </td>
                    <td className="task-remark">{task.remark}</td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{textAlign:"center",padding:28}}>
                      No requirements match these filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section id="approvals">
          <div className="section-head">
            <div>
              <div className="section-kicker">Finance action required</div>
              <h2>Finance review & approvals</h2>
              <p>
                Technical implementation is completed or ready for review.
                Closure depends on Finance validation and formal feedback.
              </p>
            </div>
          </div>

          <div className="info-grid">
            <article className="info-card">
              <FileCheck2 size={19}/>
              <h3>Statement of Financial Position · 80%</h3>
              <p>
                Developer implementation completed to the agreed scope.
                Finance to validate statement balances, classifications
                and presentation, then provide formal approval.
              </p>
            </article>

            <article className="info-card">
              <ClipboardCheck size={19}/>
              <h3>Trial Balance · 80%</h3>
              <p>
                Report implementation is ready for Finance review.
                Feedback is required on account balances, account mapping
                and reconciliation presentation.
              </p>
            </article>

            <article className="info-card">
              <ShieldCheck size={19}/>
              <h3>Bank Reconciliation · 90%</h3>
              <p>
                Report developed and available for review.
                Finance confirmation of reconciliation outputs
                and formal sign-off remain outstanding.
              </p>
            </article>
          </div>

          <div className="notice">
            <AlertCircle size={15}/>
            <div>
              <strong>Variance Analysis — feedback pending</strong>
              <p>
                Finance feedback is outstanding on variance interpretation
                and final presentation. No official completion percentage
                has been provided, so none is displayed.
              </p>
            </div>
          </div>
        </section>

        <section id="operations">
          <div className="section-head">
            <div>
              <div className="section-kicker">Operational reporting scope</div>
              <h2>Operations & financial controls</h2>
              <p>
                Operational views included in the reporting scope.
                Actual figures are dataset-driven.
              </p>
            </div>
          </div>

          <div className="info-grid">
            <article className="info-card">
              <Wallet size={19}/>
              <h3>Staff imprests & surrenders</h3>
              <p>
                Amount issued, surrendered or retired, outstanding balance,
                due date, days outstanding, overdue band, officer,
                department and submission/approval dates.
              </p>
            </article>

            <article className="info-card">
              <Building2 size={19}/>
              <h3>Petty cash</h3>
              <p>
                Float value, voucher and disbursement amounts,
                replenishments, closing balance and assigned custodian.
              </p>
            </article>

            <article className="info-card">
              <FileText size={19}/>
              <h3>Claims reporting</h3>
              <p>
                Claims count, paid value in KES, average claim value,
                monthly trend and departmental breakdown.
                Figures populate from the connected dataset.
              </p>
            </article>
          </div>
        </section>

        <section id="technical">
          <div className="section-head">
            <div>
              <div className="section-kicker">Implementation notes</div>
              <h2>Technical delivery</h2>
              <p>
                Data modelling, transformation and governance
                considerations for reliable reporting.
              </p>
            </div>
          </div>

          <div className="info-grid">
            <article className="info-card">
              <Database size={19}/>
              <h3>Semantic model & relationships</h3>
              <p>
                Use a star-schema approach with clearly defined fact
                and dimension tables. Prefer single-direction dimension
                to fact filtering and avoid competing active relationship
                paths through bridge tables.
              </p>
            </article>

            <article className="info-card">
              <BarChart3 size={19}/>
              <h3>Dimension mapping & DAX</h3>
              <p>
                Resolve department labels through DimensionSetEntries
                by matching Dimension Set ID, filtering Dimension Code
                to DEPT, and returning Dimension Value Name.
                Fiscal periods follow the July–June financial year.
              </p>
            </article>

            <article className="info-card">
              <ShieldCheck size={19}/>
              <h3>Validation & governance</h3>
              <p>
                Apply source-to-report reconciliation, refresh credential
                monitoring, role-based access where required, and
                documented Finance validation before formal sign-off.
              </p>
            </article>
          </div>
        </section>

        <section id="claims">
          <div className="section-head">
            <div>
              <div className="section-kicker">Claims programme</div>
              <h2>Claims reporting completion</h2>
              <p>
                Completion status supplied for the claims reporting component.
              </p>
            </div>
          </div>

          <div className="panel claims-card">
            <div>
              <div className="section-kicker">Implementation completion</div>
              <div className="claims-number">100%</div>
              <div className="claims-meta">
                Claims-paid reporting component marked complete.<br/>
                Claims count and total paid value (KES) will be populated
                from the reporting dataset.
              </div>
            </div>

            <div className="claims-progress">
              <div className="panel-title">
                <h3>Delivery completion</h3>
                <span>Complete</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width:"100%",
                    background:"linear-gradient(90deg,#3eaa8c,#83dfb4)"
                  }}
                />
              </div>
              <div style={{
                display:"flex",
                justifyContent:"space-between",
                fontSize:9,
                color:"#8d9bb0",
                marginTop:9
              }}>
                <span>Implementation</span>
                <strong style={{color:"#83dfb4"}}>100% complete</strong>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <span>
            UFAA FINANCIAL REPORTING PROGRAMME · PROJECT DELIVERY REPORT
          </span>
          <span>
            Prepared by David Seme · Loci Africa Technologies · 30 October 2026
          </span>
        </footer>

      </main>
    </div>
  );
}
