/* ================= STORAGE ================= */
const A_KEY = "fontys_assignments";
const G_KEY = "fontys_grades";

let tasks = JSON.parse(localStorage.getItem(A_KEY) || "[]");
let grades = JSON.parse(localStorage.getItem(G_KEY) || "[]");

/* ================= FIRST TIME LOAD ================= */
if(!Array.isArray(tasks) || tasks.length === 0){
tasks = [

/* === Cybersecurity === */
{title:"API Integration Task", course:"Software Engineering", type:"Practical", teacher:"Freddy Hurkmans", deadline:"2025-09-10", status:"Graded", grade:"7.1", teacherComment:"Valid implementation.", description:"REST API integration exercise.", file:"api_integration.zip"},
{title:"Firewall Rule Audit", course:"Cybersecurity", type:"Practical", teacher:"Dr. Jansen", deadline:"2025-09-14", status:"Graded", grade:"6.8", teacherComment:"Correct overall.", description:"Firewall policy review and audit export.", file:"firewall_audit.pdf"},
{title:"Model Overfitting Review", course:"Applied AI", type:"Report", teacher:"Ms. Visser", deadline:"2025-09-16", status:"Graded", grade:"6.8", teacherComment:"OK.", description:"ML model review.", file:"overfit_review.pdf"},
{title:"SystemD Service Recovery", course:"Infrastructure", type:"Exam", teacher:"Mr. de Vries", deadline:"2025-09-21", status:"Graded", grade:"7.2", teacherComment:"Solid recovery.", description:"SystemD repair & logging.", file:"systemd_recovery.pdf"},
{title:"Packet Inspection Lab", course:"Cybersecurity", type:"Lab Work", teacher:"Dr. Jansen", deadline:"2025-09-27", status:"Graded", grade:"7.2", teacherComment:"Good methodology.", description:"Packet tracing and anomaly detection lab.", file:"packet_lab.zip"},
{title:"Database Normalization Task", course:"Software Engineering", type:"Practical", teacher:"Freddy Hurkmans", deadline:"2025-09-28", status:"Graded", grade:"7.3", teacherComment:"Normalized correctly.", description:"DB 3NF normalization task.", file:"db_normalization.pdf"},
{title:"Architecture Outline Draft", course:"Integrated ICT Project", type:"Project", teacher:"Lucas Vermeer", deadline:"2025-09-29", status:"Graded", grade:"7.0", teacherComment:"Stable start.", description:"System architecture draft.", file:"architecture_outline.pdf"},
{title:"UI Component Structure", course:"Software Engineering", type:"Practical", teacher:"Freddy Hurkmans", deadline:"2025-10-01", status:"Graded", grade:"6.9", teacherComment:"Minor issues.", description:"Frontend component composition.", file:"ui_components.zip"},
{title:"Hash Collision Case Study", course:"Cybersecurity", type:"Report", teacher:"Dr. Jansen", deadline:"2025-10-05", status:"Graded", grade:"7.4", teacherComment:"Clear findings.", description:"MD5/SHA1 collision reproduction.", file:"hash_study.pdf"},
{title:"Dataset Bias Analysis", course:"Applied AI", type:"Research", teacher:"Ms. Visser", deadline:"2025-10-09", status:"Graded", grade:"7.3", teacherComment:"Good depth.", description:"Bias & fairness testing.", file:"bias_analysis.pdf"},
{title:"SSH Key Rotation Script", course:"Infrastructure", type:"Practical", teacher:"Mr. de Vries", deadline:"2025-10-11", status:"Graded", grade:"6.3", teacherComment:"Works, messy.", description:"SSH key lifecycle automation.", file:"ssh_rotate.sh"},
{title:"Incident Response Notes", course:"Cybersecurity", type:"Report", teacher:"Dr. Jansen", deadline:"2025-10-19", status:"Graded", grade:"6.5", teacherComment:"Shallow conclusion.", description:"IR procedure notes.", file:"incident_notes.docx"},
{title:"Initial Prototype Review", course:"Integrated ICT Project", type:"Project", teacher:"Lucas Vermeer", deadline:"2025-10-17", status:"Graded", grade:"6.9", teacherComment:"Needs polish.", description:"Prototype iteration review.", file:"proto_review.zip"},
{title:"Database Migration Script", course:"Software Engineering", type:"Report", teacher:"Freddy Hurkmans", deadline:"2025-10-25", status:"Graded", grade:"7.7", teacherComment:"Good structure.", description:"Schema migration documentation.", file:"migration_script.zip"},
{title:"Prompt Processing Notes", course:"Applied AI", type:"Exam", teacher:"Ms. Visser", deadline:"2025-11-14", status:"Graded", grade:"7.6", teacherComment:"Strong answers.", description:"Prompt chain reliability.", file:"prompt_notes.docx"},
{title:"Frontend Component Test", course:"Software Engineering", type:"Practical", teacher:"Freddy Hurkmans", deadline:"2025-11-02", status:"Graded", grade:"6.6", teacherComment:"Functional.", description:"React/Vue/Angular testing.", file:"frontend_test.zip"},
{title:"Policy Configuration Log", course:"Infrastructure", type:"Lab Work", teacher:"Mr. de Vries", deadline:"2025-11-06", status:"Graded", grade:"7.5", teacherComment:"Well presented.", description:"Policy config documentation.", file:"policy_log.docx"},
{title:"Milestone 1 Submission", course:"Integrated ICT Project", type:"Project", teacher:"Lucas Vermeer", deadline:"2025-11-28", status:"Graded", grade:"7.4", teacherComment:"Good work.", description:"M1 delivery.", file:"milestone1.zip"},
{title:"Sandbox Failure Log", course:"Applied AI", type:"Lab Work", teacher:"Ms. Visser", deadline:"2025-12-01", status:"Graded", grade:"6.7", teacherComment:"Acceptable.", description:"Break/Fail sandbox logs.", file:"sandbox_log.pdf"},
{title:"Kernel Param Tuning Sheet", course:"Infrastructure", type:"Report", teacher:"Mr. de Vries", deadline:"2025-12-03", status:"Graded", grade:"6.6", teacherComment:"Missing notes.", description:"/etc/sysctl.conf tuning.", file:"kernel_tuning.pdf"},
{title:"Release Notes Draft", course:"Software Engineering", type:"Report", teacher:"Freddy Hurkmans", deadline:"2025-11-03", status:"Graded", grade:"6.4", teacherComment:"Formatting issues.", description:"Draft release notes.", file:"release_notes.pdf"},
{title:"Pre-Final Preview", course:"Integrated ICT Project", type:"Project", teacher:"Lucas Vermeer", deadline:"2025-12-20", status:"Pending", grade:null, teacherComment:"", description:"Pre-final check.", file:null}
];

/* === сортировка по дате (новые → старые) === */
tasks.sort((a,b)=> new Date(b.deadline) - new Date(a.deadline));

grades = tasks.filter(t=>t.grade).map(t=>({
  title:t.title, course:t.course, type:t.type,
  teacher:t.teacher, score:t.grade, date:t.deadline
}));
grades.sort((a,b)=> new Date(b.date) - new Date(a.date));

localStorage.setItem(A_KEY, JSON.stringify(tasks));
localStorage.setItem(G_KEY, JSON.stringify(grades));
}

/* ================= LIST ================= */
function renderAssignList(){
  const box = document.getElementById("assignList");
  box.innerHTML = "";
  tasks.forEach((t,i)=>{
    const badge = t.status === "Graded" ? "🟢" : t.status === "Submitted" ? "🟡" : "🔴";
    box.innerHTML += `
    <div class="assignment-card" onclick="openAssign(${i})">
      <div class="title">${badge} ${t.title}</div>
      <div class="info">${t.course} • ${t.type}</div>
      <div class="info">Teacher: ${t.teacher}</div>
      <div class="status-tag status ${t.status.toLowerCase()}">${t.status}</div>
    </div>`;
  });
}

/* ================= VIEW ================= */
function openAssign(i){
  const t = tasks[i];
  const upload = t.status === "Pending";

  document.getElementById("assignView").innerHTML = `
    <h2>${t.title}</h2>
    <div class="muted">${t.course} • ${t.type} • Deadline: ${t.deadline}</div>
    <div class="teacher-tag">👨‍🏫 Evaluated by: <b>${t.teacher || ""}</b></div>
    <p>${t.description || ""}</p>

    ${upload ? `
      <h3>📁 Upload Work</h3>
      <input type="file" id="fileUpload">
      <button class="submit-btn" onclick="uploadFile(${i})">⬆️ Upload</button>` 
    : `
      <h3>📁 Submitted File</h3>
      <div class="file-info">📎 ${t.file}</div>`}

    ${t.grade ? `
      <h3>💯 Grade</h3>
      <div class="grade-box"><b>${t.grade}/10</b><br>${t.teacherComment}</div>` 
    : ""}
  `;
}

function uploadFile(i){
  const f = document.getElementById("fileUpload").files[0];
  if(!f) return;
  tasks[i].file = f.name;
  tasks[i].status = "Submitted";
  localStorage.setItem(A_KEY, JSON.stringify(tasks));
  openAssign(i);
  renderAssignList();
}

window.addEventListener("DOMContentLoaded", renderAssignList);
