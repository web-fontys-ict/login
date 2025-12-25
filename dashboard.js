/* ===================== DASHBOARD INIT ===================== */
document.addEventListener("DOMContentLoaded", ()=>{

  /* === PROFILE SYNC === */
  const student = JSON.parse(localStorage.getItem("profile_data") || "{}");
  if(student.profileName){
    document.getElementById("studentName").innerText = student.profileName;
  }
  const savedAvatar = localStorage.getItem("profile_avatar");
  if(savedAvatar){
    document.getElementById("studentAvatar").src = savedAvatar;
  }

  /* === CAMPUS LIVE FEED AUTO-ROTATION === */
  const feed = document.getElementById("liveFeed");
  const liveUpdates = [
    "> Updating lab access policies...",
    "> Moodle maintenance scheduled @ 23:45",
    "> VPN latency: 142ms - remote lab may lag",
    "> Deloitte SOC internship — seats updated (3)",
    "> W-204 Cyber Lab reserved for Red Teaming",
    "> New CI/CD template added to DevOps repo"
  ];
  setInterval(()=>{
    feed.innerHTML += `<div>${liveUpdates[Math.random()*liveUpdates.length|0]}</div>`;
    feed.scrollTop = feed.scrollHeight;
  }, 8000);


  /* ===================== AI FORECAST ===================== */
  const aiBox = document.getElementById("forecastBox");
  const forecasts = [
    "Peak focus time predicted at 19:00–21:00",
    "Recommended: WebSec Validation Lab (45–60min)",
    "Performance drop risk: Form security review",
    "Growth target: DevOps pipelines + GitLab CI",
    "Skill boost forecast: Linux automation +12%",
    "Suggested next topic: XSS sanitization patch"
  ];

  setInterval(()=> {
    aiBox.innerHTML += `<p>${forecasts[Math.random()*forecasts.length|0]}</p>`;
    aiBox.scrollTop = aiBox.scrollHeight;
  }, 6000);


  /* ===================== PERFORMANCE HEATMAP ===================== */
  const ctx = document.getElementById("activityChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon","Tue","Wed","Thu","Fri"],
      datasets: [{
        data: [42,67,51,79,91],
        borderWidth: 3,
        tension: .4,
        fill: false
      }]
    },
    options: {
      plugins:{ legend:{ display:false }},
      scales:{ y:{ display:false }, x:{ display:false } }
    }
  });

});


/* ===================== SIDEBAR MENU ===================== */
function menuToggle(){
  document.querySelector("aside").classList.toggle("open");
}


/* ===================== AI STUDY ASSISTANT ===================== */
function askAI(){
  const input = document.getElementById("assistantInput");
  const out = document.getElementById("assistantResponse");
  if(!input.value.trim()) return;
  
  const answers = [
    "Check Moodle → WebSec → Lab 3. Focus 45 min.",
    "Try reviewing OWASP Top 10 before Thursday.",
    "Best approach: fix validation before deployment.",
    "Look at WAF logs; SQLi attempts spiked yesterday.",
    "Patch your forms. Missing sanitization detected."
  ];

  out.innerHTML = answers[Math.random()*answers.length|0];
  input.value = "";
}

// Load name/avatar
document.addEventListener("DOMContentLoaded",()=>{
  const user = JSON.parse(localStorage.getItem("profile_data")||"{}");
  if(user.profileName) studentName.innerText = user.profileName;
  if(localStorage.getItem("profile_avatar")) studentAvatar.src = localStorage.getItem("profile_avatar");
});

// === REALTIME CONSOLE ===
const consoleFeed = [
  "🔐 MFA token refreshed • security/session/427",
  "📡 VPN handshake established (42ms)",
  "🚧 W-204 lab closed for Red Team fix",
  "🧰 Repo push detected → SE2026/dev-branch",
  "⚠️ Login attempt blocked → foreign IP"
];
setInterval(()=>{
  const c = document.createElement("div");
  c.textContent = consoleFeed[Math.random()*consoleFeed.length|0];
  consoleStream.prepend(c);
}, 2000);

// === DYNAMIC ROADMAP ===
const skills = ["Network Defense","Incident Response","Container Security","Web Exploit Mitigation","PKI & Keys","Infra Hardening"];
function updateRoadmap(){
  roadmapList.innerHTML="";
  for(let i=0;i<4;i++){
    roadmapList.innerHTML+=`<li>➡ Next: <b>${skills[Math.random()*skills.length|0]}</b></li>`;
  }
}
setInterval(updateRoadmap,5000); updateRoadmap();

// === BEHAVIOR ENGINE ===
const predictions=[
  "Trend: Blue Team & Digital Forensics",
  "Match: CloudSec internship pipeline",
  "High compatibility: SOC & IR response",
  "Potential path: PKI & Cryptographic Ops"
];
setInterval(()=> predictionBox.textContent = predictions[Math.random()*predictions.length|0],6000);

// === SCANNER ===
const keys = Object.keys(localStorage);
scanOutput.innerHTML = keys.slice(0,8).map(k=>`<div>📁 ${k}</div>`).join("");

// === CHART ===
new Chart(activityChart.getContext("2d"), {
  type:"line",
  data:{labels:["Mon","Tue","Wed","Thu","Fri"],datasets:[{data:[40,60,55,70,95]}]},
  options:{scales:{y:{display:false},x:{display:false}},plugins:{legend:{display:false}}}
});

const terminal = document.getElementById("terminalFeed");
const logMessages = [
  "[SYS] Moodle API heartbeat OK",
  "[MAIL] 3 unread messages from lecturers",
  "[DB] Student progress autosaved",
  "[CAMPUS] Lab W-204 door access granted",
  "[VPN] Remote environment connected",
  "[NETWORK] Packet loss → 0.8% (stable)",
  "[SEC] Suspicious login blocked (RU → NL)",
  "[UPDATE] SE repository patched (v1.2.7)",
  "[CLOUD] DevOps container rebuilt",
  "[IOT] Sensor hub uplink refreshed"
];

function feedPush(){
  const msg = logMessages[Math.floor(Math.random()*logMessages.length)];
  const line = document.createElement("div");
  line.className="term-line";
  line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

setInterval(feedPush, 3000);

