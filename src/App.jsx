import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, Clock, Mail, Globe, TrendingUp, TrendingDown, ChevronDown, ChevronRight, Zap, AlertTriangle, Activity, Lock } from "lucide-react";

const PIN = "8079";

function PinGate({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === PIN) { onUnlock(); } else { setError(true); setCode(""); setTimeout(() => setError(false), 1500); }
  };
  return (
    <div style={{ minHeight: "100vh", background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <Lock size={32} color="#8B5CF6" style={{ marginBottom: 16 }} />
        <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>Situational Awareness Briefing</h2>
        <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 24px" }}>Enter PIN to continue</p>
        <input type="password" inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          autoFocus placeholder="----"
          style={{ width: 160, padding: "12px 16px", fontSize: 24, fontWeight: 700, textAlign: "center", letterSpacing: 8, background: "#2d2d44", border: error ? "2px solid #EF4444" : "2px solid #3d3d5c", borderRadius: 12, color: "#fff", outline: "none" }} />
        <br />
        <button type="submit" style={{ marginTop: 16, padding: "10px 32px", background: "#8B5CF6", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Unlock</button>
        {error && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 8 }}>Incorrect PIN</p>}
      </form>
    </div>
  );
}
function getCentralTime() {
  return new Date().toLocaleString("en-US", { timeZone: "America/Chicago", weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }) + " CT";
}

const SEGMENTS = {
  hive: { label: "Hive Studio", color: "#8B5CF6", bg: "#F5F3FF" },
  i10: { label: "i10 Research", color: "#0EA5E9", bg: "#F0F9FF" },
  electric: { label: "Electric Ease", color: "#F59E0B", bg: "#FFFBEB" },
  personal: { label: "Personal", color: "#10B981", bg: "#ECFDF5" },
  other: { label: "Other / Research", color: "#6B7280", bg: "#F9FAFB" },
};
const STATUS = {
  active: { icon: Activity, color: "#10B981", label: "Active" },
  attention: { icon: AlertTriangle, color: "#F59E0B", label: "Needs Attention" },
  stalled: { icon: Clock, color: "#EF4444", label: "Stalled" },
  deployed: { icon: CheckCircle2, color: "#0EA5E9", label: "Recently Deployed" },
};
const briefingData = {
  // displayTime is set dynamically at render time via getCentralTime()
  summary: { activeProjects: 9, needsAttention: 4, recentDeploys: 6, stalledItems: 1, unreadActions: 5 },  segments: {
    hive: {
      projects: [
        { name: "superstack1", repo: "superstack1", status: "active", lastPush: "Mar 26", detail: "Paperclip deep research added. TypeScript. CEO Agent passive after board approval — needs re-trigger.", vercel: "—", issue: "Paperclip CEO Agent not acting on board approval (SUP-1). CTO hire approved but no follow-through." },
        { name: "paperclipAU", repo: "paperclipAU", status: "active", lastPush: "Mar 24", detail: "Open-source orchestration for zero-human companies.", vercel: "—" },
        { name: "basepoint-mono2", repo: "basepoint-mono2", status: "attention", lastPush: "Mar 24", detail: "Session 26 done. Epic rkjz open — DAY 3. 9 beads, 4 Spectrum tables unintegrated. Session 27 overdue.", vercel: "basepoint-mono2", issue: "Epic rkjz DAY 3: WO_TYPE_MC, WO_COST_HISTORY_MC, JC_ALT_JOB_BILLING_MC, JC_JOB_MASTER_TOTAL_MC pipeline drops" },
        { name: "hivestudio-ai", repo: "—", status: "deployed", lastPush: "—", detail: "Vercel project live. Main Hive Studio web presence.", vercel: "hivestudio-ai" },
        { name: "exodus1", repo: "exodus1", status: "deployed", lastPush: "Mar 21", detail: "TTS fully operational (A-Xee voice). 72 PASS, 0 FAIL. 1 open bead: Pakistan validation.", vercel: "exodus1" },
        { name: "tstarr", repo: "tstarr", status: "deployed", lastPush: "Mar 23", detail: "HTML. Deployed on Vercel.", vercel: "tstarr" },
        { name: "cowork-codex-test", repo: "cowork-codex-test", status: "active", lastPush: "Mar 26", detail: "JS. Snake game test project.", vercel: "—" },
        { name: "TheSwarm", repo: "TheSwarm", status: "active", lastPush: "Mar 21", detail: "Shell scripts. Swarm experimentation.", vercel: "the-swarm" },
      ],
      notion: ["AI Consultancy Project", "Projects 2025"],
      actions: [
        { type: "warning", text: "Epic rkjz on basepoint-mono2 DAY 3: 4 Spectrum tables unintegrated, pipeline drops columns at 4 points. Session 27 overdue." },
        { type: "warning", text: "Paperclip CEO Agent passive — board approved CTO hire + execution plan on SUP-1 but CEO Agent hasn't acted. Needs manual re-trigger or automation fix." },
      ],
      overall: "Two blockers: basepoint-mono2 Epic rkjz (day 3) + Paperclip CEO Agent stalled after board approval.",
    },
    i10: {
      projects: [
        { name: "i10research-website", repo: "i10research-website", status: "deployed", lastPush: "Mar 28", detail: "Stripe→Sendy+GHL subscriber backfill deployed. 2 CTO Agent deploys ERRORED (LinkedIn ad + security headers). Production stable.", vercel: "i10research-website", issue: "2 ERROR deploys from CTO Agent (Mar 27) — LinkedIn ad campaign + security headers commits broke build" },
        { name: "es-futures-levels", repo: "es-futures-levels", status: "active", lastPush: "Mar 27", detail: "Daily auto-update bot. Alfred posting to Slack #n8n. No Saturday update expected.", vercel: "—" },
        { name: "Trading Tools", repo: "au-MktStructureVP / PERMShindcast", status: "active", lastPush: "Various", detail: "Market structure and hindcast tools.", vercel: "—" },
      ],
      notion: ["ITPM PTM Idea Generation", "Boosted.ai", "Alfred Reports", "Aaron strategies"],
      actions: [
        { type: "info", text: "Alfred ES (Mar 27): Key 6549 | R: 6580/6611 | S: 6511/6470/6446 | VIX: 23.42/27.24. No Sat update." },
        { type: "warning", text: "2 ERROR deploys on i10research-website from CTO Agent — LinkedIn ad campaign + security headers broke Vercel build. Production unaffected (last READY deploy is Stripe backfill)." },
        { type: "warning", text: "Nasdaq password expiring for auitenbroek+1@gmail.com — change before lockout" },
      ],
      overall: "i10 website production stable with new Stripe sync. 2 CTO Agent commits errored. Alfred levels steady (Sat, no update). Nasdaq pw still expiring.",
    },    electric: {
      projects: [{ name: "electricease-ai1", repo: "electricease-ai1", status: "stalled", lastPush: "Mar 23", detail: "PHP. Rebuild knowledge pack + PDFTron replacement. No activity in 5 days.", vercel: "—" }],
      notion: [], actions: [{ type: "warning", text: "electricease-ai1 stalled 5 days (since Mar 23) — needs status check and next steps" }],
      overall: "electricease-ai1 stalled 5 days. Needs status check.",
    },
    personal: {
      projects: [],
      notion: ["Personal AI Assistant Dashboard"],
      actions: [
        { type: "warning", text: "West Bank acct (*4762): Balance below threshold after $6.25 WDW purchase (Mar 28)." },
        { type: "warning", text: "Discover Card (ending 6463): $17,415.49 balance. Min $350 due Apr 22." },
        { type: "info", text: "Calendar today: No events scheduled (Saturday). Audible: 2 unused credits." },
        { type: "info", text: "WSJ: Iran war alarm on Wall Street. Google Alert: UN report on Syria sectarian violence (1700+ killed)." },
      ],
      overall: "Saturday — no calendar events. Bank balance alert on WDW purchase. Discover $350 due Apr 22.",
    },
    other: {
      projects: [{ name: "Agent Stack (ruflo/agentic-flow/RuVector)", repo: "Various forks", status: "active", lastPush: "Ongoing", detail: "28 agent definitions pulled. MCP Brain installed. 92 agents available.", vercel: "—" }],
      notion: ["RUVECTOR POSTGRES CLOUD BRAIN ARCHITECTURE", "AGENTIC-FLOW + RUVECTOR", "OCR-au MCP details"],
      actions: [
        { type: "info", text: "WSJ 10-Point: Wall Street's Iran alarm — how long will the war last? Oil/geopolitical risk elevated." },
        { type: "info", text: "Previous: LiteLLM breach 3.4M records. Tesla AI factory TX. NVIDIA AGI claim. Prediction market ban proposed." },
      ],
      overall: "Research stable. Geopolitical risk elevated (Iran). Agent stack operational.",
    },
  },
  highImpact: { action: "Re-trigger Paperclip CEO Agent on SUP-1 — board approval sitting unread", reason: "The Board approved the CTO hire + execution plan on SUP-1 (Mar 26-27), but the CEO Agent stopped after escalating. It has no polling loop — it won't see the approval until manually re-invoked. This is blocking Phase A (technical audit + launch verification) for the entire Paperclip/Superstack operation. A 5-minute re-trigger closes the loop. basepoint-mono2 Session 27 (day 3) is the second priority.", segment: "hive" },
};function Badge({ status }) {
  const s = STATUS[status]; if (!s) return null; const Icon = s.icon;
  return (<span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: s.color, background: s.color + "18", padding: "2px 8px", borderRadius: 12 }}><Icon size={12} /> {s.label}</span>);
}
function SegmentBadge({ seg }) {
  const s = SEGMENTS[seg];
  return (<span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: s.color, background: s.bg, padding: "2px 8px", borderRadius: 4, textTransform: "uppercase" }}>{s.label}</span>);
}
function StatCard({ label, value, icon: Icon, color }) {
  return (<div style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", flex: 1, minWidth: 130, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 28, fontWeight: 700, color: "#1a1a2e" }}>{value}</span><Icon size={20} color={color} /></div>
    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{label}</div></div>);
}
function ProjectRow({ project }) {
  return (<div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
    <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{project.name}</div>
      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{project.detail}</div>
      {project.issue && (<div style={{ fontSize: 12, color: "#EF4444", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}><AlertCircle size={12} /> {project.issue}</div>)}</div>
    <div style={{ textAlign: "right", minWidth: 90 }}><Badge status={project.status} /><div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{project.lastPush}</div></div></div>);
}
function ActionItem({ action }) {
  const w = action.type === "warning";
  return (<div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 12px", borderRadius: 8, background: w ? "#FEF3C7" : "#F0F9FF", marginBottom: 6, fontSize: 13 }}>
    {w ? <AlertTriangle size={14} color="#D97706" style={{ marginTop: 2, flexShrink: 0 }} /> : <Zap size={14} color="#0EA5E9" style={{ marginTop: 2, flexShrink: 0 }} />}
    <span style={{ color: w ? "#92400E" : "#0C4A6E" }}>{action.text}</span></div>);
}function SegmentSection({ segKey, data }) {
  const [open, setOpen] = useState(true); const seg = SEGMENTS[segKey];
  return (<div style={{ marginBottom: 20, background: "#fff", borderRadius: 12, border: `1px solid ${seg.color}22`, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
    <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", background: seg.bg, border: "none", cursor: "pointer", borderBottom: open ? `1px solid ${seg.color}22` : "none" }}>
      {open ? <ChevronDown size={16} color={seg.color} /> : <ChevronRight size={16} color={seg.color} />}
      <span style={{ fontWeight: 700, fontSize: 15, color: seg.color }}>{seg.label}</span>
      <span style={{ fontSize: 12, color: "#6b7280", marginLeft: "auto" }}>{data.overall}</span></button>
    {open && (<div style={{ padding: "12px 20px 16px" }}>
      {data.actions.length > 0 && <div style={{ marginBottom: 12 }}>{data.actions.map((a, i) => <ActionItem key={i} action={a} />)}</div>}
      {data.projects.map((p, i) => <ProjectRow key={i} project={p} />)}
      {data.notion.length > 0 && (<div style={{ marginTop: 12, padding: "8px 12px", background: "#F9FAFB", borderRadius: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 4 }}>NOTION PAGES</div>
        <div style={{ fontSize: 12, color: "#374151" }}>{data.notion.join(" · ")}</div></div>)}
    </div>)}</div>);
}function Dashboard() {
  const d = briefingData;
  const [activeTab, setActiveTab] = useState("overview");
  const [displayTime, setDisplayTime] = useState(getCentralTime());
  useEffect(() => { const t = setInterval(() => setDisplayTime(getCentralTime()), 60000); return () => clearInterval(t); }, []);
  return (<div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", maxWidth: 820, margin: "0 auto", padding: 24, background: "#FAFAFA", minHeight: "100vh" }}>
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: "#10B981", textTransform: "uppercase", letterSpacing: 1 }}>Live Briefing</span></div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", margin: "0 0 4px" }}>Situational Awareness Briefing</h1>
      <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{displayTime} · Aaron Uitenbroek</p></div>
    <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
      <StatCard label="Active Projects" value={d.summary.activeProjects} icon={Activity} color="#10B981" />
      <StatCard label="Needs Attention" value={d.summary.needsAttention} icon={AlertTriangle} color="#F59E0B" />
      <StatCard label="Recent Deploys" value={d.summary.recentDeploys} icon={Globe} color="#0EA5E9" />
      <StatCard label="Unread Actions" value={d.summary.unreadActions} icon={Mail} color="#EF4444" /></div>
    <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d1b69 100%)", borderRadius: 12, padding: "18px 22px", marginBottom: 24, color: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <Zap size={16} color="#FBBF24" /><span style={{ fontSize: 12, fontWeight: 700, color: "#FBBF24", textTransform: "uppercase", letterSpacing: 0.5 }}>Highest-Impact Action</span>
        <SegmentBadge seg={d.highImpact.segment} /></div>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{d.highImpact.action}</div>
      <div style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.5 }}>{d.highImpact.reason}</div></div>    <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "2px solid #e5e7eb" }}>
      {[{ id: "overview", label: "All Segments" }, { id: "actions", label: "Action Items" }, { id: "market", label: "Market Data" }].map((tab) => (
        <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "10px 20px", fontSize: 13, fontWeight: 600, border: "none", background: "none", cursor: "pointer", color: activeTab === tab.id ? "#8B5CF6" : "#6b7280", borderBottom: activeTab === tab.id ? "2px solid #8B5CF6" : "2px solid transparent", marginBottom: -2 }}>{tab.label}</button>))}</div>
    {activeTab === "overview" && <div>{Object.entries(d.segments).map(([key, data]) => <SegmentSection key={key} segKey={key} data={data} />)}</div>}
    {activeTab === "actions" && (<div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", margin: "0 0 16px" }}>All Action Items</h3>
      {Object.entries(d.segments).flatMap(([key, seg]) => seg.actions.map((a, i) => (<div key={`${key}-${i}`} style={{ marginBottom: 8 }}><div style={{ marginBottom: 4 }}><SegmentBadge seg={key} /></div><ActionItem action={a} /></div>)))}
      <div style={{ marginTop: 16, padding: 16, background: "#F5F3FF", borderRadius: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#7C3AED", marginBottom: 6 }}>Priority Queue</div>
        <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: "#374151", lineHeight: 1.8 }}>
          <li><strong>Re-trigger Paperclip CEO Agent</strong> — board approval on SUP-1 sitting unread, blocking Phase A</li>
          <li><strong>basepoint-mono2 Session 27</strong> — Epic rkjz DAY 3: 4 Spectrum tables, overdue</li>
          <li><strong>Fix CTO Agent ERROR deploys</strong> — 2 broken builds on i10research-website (LinkedIn ad + security headers)</li>
          <li><strong>Nasdaq password expiring</strong> — change before lockout</li>
          <li><strong>Discover Card</strong> — $17,415.49 balance, $350 min due Apr 22</li>
          <li><strong>electricease-ai1</strong> — stalled 5 days, needs status check</li>
          <li><strong>exodus1 Pakistan validation</strong> — last open bead</li></ol></div></div>)}    {activeTab === "market" && (<div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", margin: "0 0 4px" }}>ES Futures — Alfred Bot Daily Levels</h3>
      <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 16px" }}>Source: Slack #n8n channel via Alfred · March 27, 2026 (no Saturday update) · ES Key 6549 (steady)</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ padding: 16, background: "#F0FDF4", borderRadius: 8, textAlign: "center" }}><div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280" }}>KEY LEVEL</div><div style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e" }}>6549</div></div>
        <div style={{ padding: 16, background: "#FEF3C7", borderRadius: 8, textAlign: "center" }}><div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280" }}>VIX</div><div style={{ fontSize: 28, fontWeight: 800, color: "#D97706" }}>23.42</div><div style={{ fontSize: 11, color: "#92400E" }}>High: 27.24</div></div></div>
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ padding: 12, background: "#ECFDF5", borderRadius: 8 }}><div style={{ fontSize: 11, fontWeight: 700, color: "#10B981", marginBottom: 8 }}><TrendingUp size={12} style={{ marginRight: 4 }} />RESISTANCE</div>
          {["6580", "6611"].map((v) => <div key={v} style={{ fontSize: 15, fontWeight: 600, color: "#065F46", padding: "2px 0" }}>{v}</div>)}</div>
        <div style={{ padding: 12, background: "#FEF2F2", borderRadius: 8 }}><div style={{ fontSize: 11, fontWeight: 700, color: "#EF4444", marginBottom: 8 }}><TrendingDown size={12} style={{ marginRight: 4 }} />SUPPORT</div>
          {["6511", "6470", "6446"].map((v) => <div key={v} style={{ fontSize: 15, fontWeight: 600, color: "#991B1B", padding: "2px 0" }}>{v}</div>)}</div></div></div>)}
    <div style={{ marginTop: 32, padding: "16px 0", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 11, color: "#9ca3af" }}>Cowork Situational Awareness Engine · v1.0</span>
      <span style={{ fontSize: 11, color: "#9ca3af" }}>Sources: Slack · Gmail · GitHub · Notion · Vercel</span></div>
    <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
  </div>);
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;
  return <Dashboard />;
}
