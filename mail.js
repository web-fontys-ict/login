/* =============== STORAGE KEY =============== */
const NEWS_KEY = "fontys_newsletters";
let newsletters = JSON.parse(localStorage.getItem(NEWS_KEY) || "null");


/* ============== FIRST LAUNCH DATA ============== */
if(!newsletters){
  newsletters = [

    {
      subject:"🎄 Merry Christmas / Vrolijk Kerstfeest",
      from:"fontys.news.reseller@outlook.com",
      date:"2025-12-24 12:00",
      body:`<b>English:</b><br><br>
Merry Christmas from Fontys ICT. This message is an official seasonal notice for all enrolled students and staff.
During the holiday period, access policies, building hours, and lab availability will differ from the standard operation cycle.
This includes partial closures, reduced support availability, and badge-only entry for specialized facilities.

From December 26 to January 5, campus networks will operate in maintenance mode.
Critical systems remain online; optional services enter standby. There is no guarantee of immediate human response
to non-critical incidents. Automated monitoring and SOC escalation pipelines continue functioning, but with limited staffing.

Access notes:
• R3.14 — open for project work, badge required, no in-person supervision.
• B2.08 — controlled entry; hardware requests suspended.
• W-204 Lab — virtualization cluster active, remote hypervisors allowed.
• Teams/Moodle/SSO — online, but response delays from helpdesk should be expected.

If you are working on deadlines or practical assignments, plan around the reduced availability window.
Time-sensitive submissions must not rely on last-minute support. If blocking technical issues occur and can be verified,
submit a disruption report when service resumes.

This message is informational; no acknowledgment required. Normal operations resume in January.<br><br>

<b>Nederlands:</b><br><br>
Vrolijk Kerstfeest namens Fontys ICT. Dit bericht dient als seizoensmededeling voor studenten en medewerkers.
Tijdens de feestdagen gelden aangepaste openingstijden, beperkte ondersteuning en badge-toegang tot technische ruimtes.

Van 26 december t/m 5 januari werken netwerken en labomgevingen in onderhoudsmodus.
Essentiële systemen blijven actief; optionele diensten worden teruggeschaald. Ondersteuning is beperkt en
niet-kritieke meldingen kunnen vertraging hebben. Automatische monitoring blijft operationeel.

Toegangsbeleid:
• R3.14 — open voor projectwerk, alleen met badge, geen fysieke begeleiding.
• B2.08 — beperkte toegang; hardwareaanvragen zijn gepauzeerd.
• W-204 Lab — virtualisatieomgeving beschikbaar voor remote toegang.
• Teams/Moodle/SSO — online, maar ondersteuningsreacties kunnen vertraagd zijn.

Plan je deadlines rond de verminderde beschikbaarheid.
Bij technische blokkades kun je na de vakantie een storingsverzoek indienen, mits verifieerbaar.

Deze mededeling is informatief; geen bevestiging nodig. De normale dienstverlening wordt in januari hervat.<br><br>

<b>Nederlands:</b><br>
Vrolijk Kerstfeest namens Fontys ICT. De campus werkt met aangepaste openingstijden van 26 december t/m 5 januari.
Labs R3.14, B2.08, W-204 Lab blijven met badge-toegang open.<br><br>

Stay safe and enjoy the break.`,
    },

    {
      subject:"🚀 Applied AI Platform Launch – New Student Access",
      from:"fontys.news.reseller@outlook.com",
      date:"2025-12-14 09:30",
      body:`Fontys ICT launches the Applied AI Platform. Includes:<br>
• Secure Lab Integration<br>
• Anti-plagiarism AI<br>
• Automated grading prototype<br><br>
Access: Teams → ICT → AI_Lab<br>
Attachment: 📎 applied_ai_overview.pdf`,
    },

    {
      subject:"🔐 MFA Required – Account Security Enforcement",
      from:"fontys.news.reseller@outlook.com",
      date:"2025-12-10 08:20",
      body:`Mandatory MFA activation before January 21. Accounts without MFA will lock.
Affected: R3.14, B2.08, W-204 Lab, Server Lab.<br><br>
Setup: Teams → ICT Security Portal`,
    }
  ];

  localStorage.setItem(NEWS_KEY, JSON.stringify(newsletters));
}


/* =============== RENDER LEFT LIST =============== */
function renderNews(){
  const box = document.getElementById("mailList");
  if(!box) return; // защита от ошибок
  box.innerHTML = "";

  newsletters.forEach((n,i) => {
    const el = document.createElement("div");
    el.className = "mail-item";
    el.innerHTML = `
      <b>${n.subject}</b><br>
      <small>${n.from} • ${n.date}</small>
    `;
    el.addEventListener("click", ()=> openNews(i));
    box.appendChild(el);
updateBadge();

  });
}


/* =============== OPEN MESSAGE =============== */
function openNews(i){
  const n = newsletters[i];
  if(!n) return;

  // выделение активного в списке
  document.querySelectorAll(".mail-item").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".mail-item")[i].classList.add("active");

  // вывод заголовка и текста
  document.getElementById("mailHeader").innerHTML = `
    <h2>${n.subject}</h2>
    <div class="mail-header-details">${n.from} • ${n.date}</div>
  `;

  document.getElementById("mailBody").innerHTML = n.body;

  // перезапись БД (если понадобятся статусы)
  localStorage.setItem(NEWS_KEY, JSON.stringify(newsletters));
}


/* =============== INIT =============== */
window.addEventListener("DOMContentLoaded", () => {
  renderNews();
});

document.getElementById("mailSearch").addEventListener("input", e=>{
  const q = e.target.value.toLowerCase();
  const filtered = newsletters.filter(m =>
    m.subject.toLowerCase().includes(q) ||
    m.body.toLowerCase().includes(q) ||
    m.from.toLowerCase().includes(q)
  );
  updateList(filtered);
});

function updateList(list){
  const box = document.getElementById("mailList");
  box.innerHTML="";
  list.forEach((n,i)=>{
    const el=document.createElement("div");
    el.className="mail-item";
    el.innerHTML=`<b>${n.subject}</b><br><small>${n.from} • ${n.date}</small>`;
    el.onclick = () => openNews(i);
    box.appendChild(el);
  });
}

function updateBadge(){
  const unread = newsletters.filter(m=>!m.read).length;
  document.getElementById("mailBadge").textContent = unread > 0 ? unread : "";
}

let currentOpened = null;

function openNews(i){
  currentOpened = i;
  const n = newsletters[i];
  n.read = true;

  document.getElementById("mailHeader").innerHTML = `
    <h2>${n.subject}</h2>
    <div class="mail-header-details">${n.from} • ${n.date}</div>
  `;

  document.getElementById("mailBody").innerHTML = `
    ${n.body}
    ${n.attachment ? `<div class="mail-attachment">📎 ${n.attachment}</div>` : ""}
`;

}

function replyMail(){
  if(currentOpened===null) return;
  const n = newsletters[currentOpened];
  alert(`Reply to: ${n.from}\n\n(This is just UI demo, sending disabled)`);
}

function forwardMail(){
  if(currentOpened===null) return;
  const n = newsletters[currentOpened];
  alert(`Forward: ${n.subject}\n\n(This is UI demo, export disabled)`);
}

newsletters.push(
{
  subject:"📢 Semester Opening – ICT Policy & Infrastructure Changes",
  from:"fontys.news.reseller@outlook.com",
  date:"2025-09-01 09:00",
  attachment:"ICT_policy_update_2025.pdf",
  body:`Welcome to the new semester. This announcement includes campus-wide updates to ICT infrastructure,
network segmentation, lab virtualization, account policy, and security operations. The new identity system
was deployed to align Fontys ICT with European standard NIST SP 800-63 and Dutch BIO compliance.

— Network Restructure:
The R3.14 building now runs on segmented VLANs with zero-trust routing. Students will experience isolated
traffic between practical laboratory zones, which include the RedLab (cyber range), BlueLab (SOC simulator),
GreenLab (AI/ML sandbox), and NeutralNet (production environment). Internal firewall policies enforce
identity-based routing: traffic paths exist only when explicitly authenticated.

— Virtualized Labs:
Server-based virtualization now replaces half the hardware labs. B2.08 and W-204 continue physical access,
but new cloud mirrors are available. These run on KVM clusters at the Eindhoven data center, tied to SSO
credentials. Persistent VM snapshots have been disabled due to forensic recovery complications during
infosec auditing exercises.

— Account Changes:
Password resets switch to self-service MFA via the EU IAM Portal. Legacy accounts without MFA will be
disabled starting January. Initial onboarding includes one-time tokens issued with a recovery link.

— Research Rollout:
Three AI-driven systems will be tested this semester:
1. "Specter" – automated grading assistant for applied programming;
2. "Icarus" – anomaly detection engine for lab misuse prevention;
3. "Echo" – contextual learning advisor integrated into Teams courses.

These systems operate in shadow evaluation mode and are not decision-authoritative yet. Students can request
their AI involvement logs through the privacy desk.

This message provides foundational material for course briefings. Additional attachments are included with
full policy and routing documentation.`
},

{
  subject:"🛠 Incident Report & Retrospective – Lab Outage B2.08 (3h)",
  from:"fontys.news.reseller@outlook.com",
  date:"2025-10-11 18:20",
  attachment:"outage_retro_B2.08.pdf",
  body:`On October 11, an infrastructure outage affected B2.08 practical labs and partially degraded network services.
Students reported loss of connectivity to debugging hosts, CI/CD runners, and internal Git mirrors. Root cause
analysis confirmed that an experimental micro-segmentation rule propagated into production without staged
validation. This was not a malicious incident; it was a configuration error triggered by misaligned YAML
parameters in an automated deployment pipeline.

Impact Summary:
• 41 workstations lost network access;
• 4 Kubernetes clusters entered a degraded state;
• 3 student capstone assessments were delayed;
• 1 SOC telemetry feed misreported anomalies.

Mitigation:
• The broken rule was isolated and reverted from the automated commit stream;
• Firewall baselines were rebuilt from golden config snapshots;
• Peer review gates were restored before merge approvals;
• Traffic throttling introduced on RedLab until validation tests complete.

Preventative Measures:
• Configuration linting moved earlier in the pipeline;
• Staged rollouts enforced mandatory human approval;
• Internal documentation updated with revised operator playbooks.

If any coursework or deadlines were impacted by this outage, contact your mentor. Extension requests will be
reviewed case-by-case but must include timestamped activity logs.`,

},

{
  subject:"🧪 AI Reliability Trials – Participation Notice (W-204, R3.14)",
  from:"fontys.news.reseller@outlook.com",
  date:"2025-11-22 14:45",
  attachment:"AI_reliability_enrollment_form.pdf",
  body:`Fontys ICT is initiating reliability trials for applied AI systems used in education. These trials do not evaluate
students; they evaluate the tools themselves. Participation is voluntary, but recommended for students in
Cybersecurity, Software Engineering, and Applied AI majors.

Scope:
— Testing automated evaluation suggestions against human-reviewed grading;
— Evaluating false positives for plagiarism detection models;
— Collecting model error states in sandbox environments;
— Tracking decision justification chains for transparency.

Where:
• W-204 Lab – supervised environment with educator intervention;
• R3.14 – free exploration mode with student autonomy.

How:
Participants submit artifacts (code, reports, datasets) and receive parallel AI and human assessments.
Discrepancies are flagged and reviewed. If the AI misclassifies, students can request removal of the automated
result via the dispute form.

Privacy:
All trials are local to Fontys infrastructure. No external training or third-party model reuse. Logging focuses on
tool performance, not personal behavior. These logs are available as per GDPR.

Deadlines:
Enrollment closes December 18. Sessions run until the winter break.

This notice is provided for transparency and informed consent.`
},

{
  subject:"🎄 Holiday Service Changes + Winter Break Schedules",
  from:"fontys.news.reseller@outlook.com",
  date:"2025-12-26 08:10",
  attachment:"holiday_hours_2025.pdf",
  body:`From December 26 until January 5, campus services will operate in limited-capacity mode. Issued resources,
secure labs, and specialized computing environments do not fully shut down; they switch to low-staffing status.

Available:
• 24/7 student ID badge access (non-escalated issues only)
• Remote hypervisor clusters
• Read-only Git mirrors
• Emergency SOC contact

Unavailable:
• In-person helpdesk
• Hardware RMA services
• Device lockdown appeals

Reminder:
Time-sensitive project submissions should not rely on weekend response windows. Digital access is maintained,
but support latency increases. If you are blocked by a technical failure that is verifiable, request a disruption
exception through your study program.

This operational mode is normal for the season and will restore gradually at the start of January.`
}
);
