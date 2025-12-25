function showMonth(id){
  document.querySelectorAll(".calendar").forEach(c=>c.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* ---------- Расписание по дням недели ---------- */
const events = weekday => {
  const map = {
    1: [
    "09:00 – 10:15 Introduction to Cyber Security",
    "10:30 – 11:45 Network Security Fundamentals",
    "13:00 – 14:15 Secure Software Development (OWASP / Secure Coding)",
    "14:30 – 15:45 Lab: Network Security (Traffic Analysis + Firewall)"
  ],
  2: [
    "09:00 – 10:15 Ethical Hacking & Penetration Testing",
    "10:30 – 11:45 Ethical Hacking Lab (CTF / Web Vulns)",
    "13:00 – 14:15 Cryptography Basics (Symmetric / Asymmetric)",
    "14:30 – 15:45 Cyber Security Project (Group Case)"
  ],
  3: [
    "09:00 – 10:15 Security Operations & Monitoring (SIEM, Logs)",
    "10:30 – 11:45 Incident Response & Forensics",
    "13:00 – 14:15 Incident Response Lab (Log Analysis)",
    "14:30 – 15:45 Professional ICT Skills (Documentation / Reports)"
  ],
  4: [
    "09:00 – 10:15 Risk Management & Compliance (ISO27001 / GDPR)",
    "10:30 – 11:45 Cyber Law & Ethics (Liability / Legal Boundaries)",
    "13:00 – 14:15 Project Work / Coaching Session"
  ],
  5: [
    "09:00 – 10:15 Blue Team Defensive Techniques (IDS/IPS / Hardening)",
    "10:30 – 11:45 Blue Team Lab (Defensive Scenarios)",
    "13:00 – 14:15 Self-Study / Portfolio Development"
  ]
  };
  return (map[weekday]||[]).map(e=>`<div class="event">${e}</div>`).join("");
};

/* ---------- Генератор дня ---------- */
const D = (n,w)=>`<div class="day"><h3>${n}</h3>${events(w)}</div>`;
const W = n=>`<div class="day weekend"><h3>${n}</h3></div>`;
const H = n=>`<div class="day holiday"><h3>${n}</h3>Holiday Break</div>`;
const C = n=>`<div class="day christmas"><h3>${n}</h3>🎄 Christmas</div>`;

/* ---------- Построение месяца ---------- */
function buildMonth(year,month,holidays=[],xmas=[]){
  const days = [];
  const first = new Date(year,month,1).getDay();
  const last = new Date(year,month+1,0).getDate();

  // понедельник как старт (JS = 1)
  const emptyStart = (first+6)%7;
  for(let i=0;i<emptyStart;i++) days.push(`<div class="day"></div>`);

  for(let d=1; d<=last; d++){
    const wd = new Date(year,month,d).getDay(); // 0 Sun ... 6 Sat
    const weekday = wd===0?7:wd;                // переводим Sun -> 7

    if(holidays.includes(d)) days.push(H(d));
    else if(xmas.includes(d)) days.push(C(d));
    else if(weekday===6||weekday===7) days.push(W(d));
    else days.push(D(d,weekday));
  }
  return days.join("");
}

/* ---------- Декабрь 2025 ---------- */
document.getElementById("dec2025").innerHTML =
  buildMonth(2025,11,[29,30,31],[25,26]);

/* ---------- Январь 2026 ---------- */
document.getElementById("jan2026").innerHTML =
  buildMonth(2026,0,[1,2,3,4,5,6,7,8,9,10,11],[]);
