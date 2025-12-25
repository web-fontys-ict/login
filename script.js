/* === FORCE DARK THEME === */
document.documentElement.setAttribute("data-theme","dark");
localStorage.setItem("theme","dark");

/* отключаем переключение если где-то вызывается */
function toggleTheme(){
  return; // ничего не делает
}


/* ===================== BURGER MENU ===================== */
function menuToggle(){document.querySelector("aside").classList.toggle("open");}

/* ===================== LOGIN ===================== */
async function authLogin(){
  const db=await fetch("database.json").then(r=>r.json());
  const email=document.getElementById("loginEmail").value.trim();
  const pass=document.getElementById("loginPass").value.trim();
  if(email===db.student.email && pass===db.student.password){
    localStorage.setItem("auth","true");
    location.href="index.html";
  }else alert("Wrong login");
}

/* ===================== CHAT (WHATSAPP STYLE + AVATARS) ===================== */

let currentDialog = null;
let dialogs = JSON.parse(localStorage.getItem("dialogs") || "{}");

if(Object.keys(dialogs).length===0){
dialogs={

jansen:[
{from:"jansen", text:"Good morning Maksim, updated November schedule uploaded.", time:"09:12", date:"03/11/2025"},
{from:"jansen", text:"Meeting today in R3.14. Bring your progress notes.", time:"11:05", date:"07/11/2025"},
{from:"jansen", text:"Project guidelines link: Teams → CS2025 → Project Docs", time:"13:20", date:"10/11/2025"},
{from:"student", text:"Reading it now, thanks.", time:"13:44", date:"10/11/2025"},
{from:"jansen", text:"Deadline 18 Dec, 09:00, room R3.14", time:"13:55", date:"28/11/2025"},
{from:"jansen", text:"Presentation 12 Dec, W-204 Lab. Confirm attendance.", time:"09:45", date:"05/12/2025"}
],

hurkmans:[
{from:"hurkmans", text:"Welcome back after the summer. Your project group has been assigned.", time:"09:30", date:"10/09/2025"},
{from:"hurkmans", text:"Check the repository: Teams → SE2025 → Starter Kit", time:"11:12", date:"18/09/2025"},
{from:"student", text:"I cloned it, will start setup tonight.", time:"11:26", date:"18/09/2025"},
{from:"hurkmans", text:"Classroom change: R3.14 → W-204 Lab for next week.", time:"08:44", date:"02/10/2025"},
{from:"hurkmans", text:"Security review scheduled. Submit code before 5 Dec.", time:"14:05", date:"01/12/2025"}
],

vermeer:[
{from:"vermeer", text:"Your Linux environment is outdated. Update kernel before next lab.", time:"13:50", date:"20/09/2025"},
{from:"student", text:"Will reinstall tonight.", time:"14:02", date:"20/09/2025"},
{from:"vermeer", text:"Workshop: containerization basics — 11 Oct, B2.08", time:"09:41", date:"03/10/2025"},
{from:"vermeer", text:"Missing deliverable: deployment.yaml. Upload to Moodle.", time:"16:33", date:"25/11/2025"},
{from:"vermeer", text:"Reminder: Final demo on 15 December, W-204 Lab.", time:"09:10", date:"15/12/2025"}
],

devries:[
{from:"devries", text:"Cryptography homework posted: Moodle → Week 6 → Tasks", time:"10:44", date:"08/11/2025"},
{from:"devries", text:"Workshop: Hashing/Salting, 4 Dec, B2.08 (mandatory).", time:"13:10", date:"11/11/2025"},
{from:"student", text:"I'll be there.", time:"13:22", date:"11/11/2025"},
{from:"devries", text:"Exam review: 20 Dec, room R3.14", time:"12:20", date:"11/12/2025"}
],

visser:[
{from:"visser", text:"WebSec feedback: Teams → Feedback Panel", time:"08:55", date:"18/11/2025"},
{from:"visser", text:"Missing anti-XSS validation. Add sanitization.", time:"09:27", date:"18/11/2025"},
{from:"student", text:"Fixing today.", time:"10:53", date:"21/11/2025"},
{from:"visser", text:"Patch test 19 Dec, W-204 Lab.", time:"15:17", date:"15/12/2025"}
]

};
localStorage.setItem("dialogs",JSON.stringify(dialogs));
}

/* ==== АВАТАРЫ ==== */
const chatAvatars = {
  jansen   : `<img src="q3.png" class="msg-avatar-bubble">`,
  hurkmans : `<img src="q1.png" class="msg-avatar-bubble">`,
  vermeer  : `<img src="q2.png" class="msg-avatar-bubble">`,
  devries  : `<img src="q4.png" class="msg-avatar-bubble">`,
  visser   : `<img src="q5.png" class="msg-avatar-bubble">`,
  student  : `<img src="avatar.png" class="msg-avatar-bubble">` // можно заменить фото позже
};

/* ==== ОТКРЫТИЕ ЧАТА ==== */
function openDialog(name){
  currentDialog=name;
  const title={
    jansen:"Dr. Jansen",
    devries:"Mr. de Kries",
    visser:"Ms. Visser",
    hurkmans:"Freddy Hurkmans",
    vermeer:"Lucas Vermeer"
  }[name];
  document.getElementById("chatTitle").innerText=title;
  renderDialog();
  resetBadge(name);
}

/* ==== ВЫВОД СООБЩЕНИЙ ==== */
function renderDialog(){
  const box = document.getElementById("chatWindow");
  if(!box || !currentDialog) return;
  box.innerHTML = "";

  dialogs[currentDialog].forEach(msg=>{
    const avatar = chatAvatars[msg.from] || chatAvatars.student;
    const right = msg.from === "student"; // ты → справа

    box.innerHTML += `
      <div class="msg-row ${right?"student":""}">
        ${right ? "" : avatar}
        <div class="msg-bubble ${right?"my-msg":""}">
          ${msg.text}
          <div class="meta">${msg.time} • ${msg.date}</div>
        </div>
        ${right ? avatar : ""}
      </div>
    `;
  });

  box.scrollTop = box.scrollHeight;
}


/* ==== ОТПРАВКА ==== */
document.getElementById("sendMsg")?.addEventListener("click",()=>{
  if(!currentDialog)return;
  const input=document.getElementById("chatInput");
  if(!input.value.trim())return;
  const now=new Date();
  dialogs[currentDialog].push({
    from:"student",
    text:input.value.trim(),
    time:now.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}),
    date:now.toLocaleDateString("en-GB")
  });
  input.value="";
  localStorage.setItem("dialogs",JSON.stringify(dialogs));
  renderDialog();
});

/* ==== СБРОС БЕЙДЖА ==== */
function resetBadge(name){
  const b=document.getElementById(`badge-${name}`);
  if(b)b.remove();
}



/* ===================== MAIL SYSTEM (UPDATED REALISTIC) ===================== */

const STORAGE = "fontys_mail_data";
let mailData = JSON.parse(localStorage.getItem(STORAGE) || "null");

if(!mailData){
mailData = {

Inbox:[

{
subject:"🎄 Merry Christmas / Vrolijk Kerstfeest — Official Notice",
from:"fontys.news.reseller@outlook.com",
date:"2025-12-25 12:00",
read:false,
body:`
Dear student,

On behalf of Fontys Hogescholen – ICT Eindhoven, we extend our sincere wishes for a Merry Christmas (Vrolijk Kerstfeest) and a peaceful winter break. This message is sent as an official academic and facilities notice concerning end-of-year operations.

────────────────────────────────────────
ENGLISH
────────────────────────────────────────
Campus services will operate in limited capacity from 25 December to 2 January. During this period:

• Building access requires a valid campus card  
• IT support response time: 48–72 hours  
• Library and printing zones remain available 10:00–16:00  
• Project rooms R3.14, B2.08 and W-204 Lab are closed for renovation  
• Internship approval forms submitted after 27 December are processed in January  

Students who require access to laboratories must file an access request via Teams → Facilities → Holiday Access Form. Unauthorized presence in restricted labs is a violation of Fontys security policy.

────────────────────────────────────────
NEDERLANDS
────────────────────────────────────────
Campusdiensten werken met beperkte capaciteit van 25 december tot 2 januari. In deze periode:

• Toegang tot gebouwen vereist geldige campuskaart  
• IT-support beantwoording: 48–72 uur  
• Bibliotheek & printzones 10:00–16:00 geopend  
• Projectruimtes R3.14, B2.08 en W-204 Lab gesloten i.v.m. renovatie  
• Stageaanvragen na 27 december worden in januari verwerkt  

Toegang tot laboratoria is alleen mogelijk met een schriftelijke aanvraag via Teams → Facilities → Holiday Access Form.

────────────────────────────────────────
We wish you a safe holiday period. Please monitor your inbox for January scheduling and exam guidance.

Best regards,  
Fontys ICT Eindhoven
`
},

{
subject:"[Fontys ICT] Applied AI Education Platform — Launch Announcement",
from:"fontys.news.reseller@outlook.com",
date:"2025-12-21 09:42",
read:false,
body:`
Fontys Hogeschool ICT Eindhoven announces the deployment of the Applied AI Education Platform for the academic year 2026. The platform integrates ML, neural-network compute nodes, and student-accessible sandbox environments for research and coursework.

Core components now available:
• GPU compute queue with RTX A4500 nodes  
• JupyterLab access with Python 3.12 + CUDA toolchain  
• Model hosting space (5GB per student)  
• Sandbox for reinforcement learning experiment sets  
• Academic license for AI Ethics & Compliance module  

Access is provided exclusively through the Fontys Teams portal:
Teams → Courses → AI-Lab → Platform Login

Students working on graduation projects may request extended quota allocation (12–20GB). Approval requires supervisor validation. Unauthorized model deployment on external servers is subject to audit review and system flagging.
`
},

{
subject:"[Security Compliance] MFA + Password Rotation Required",
from:"fontys.news.reseller@outlook.com",
date:"2025-12-18 14:12",
read:false,
body:`
Following the most recent digital security review, we detected outdated MFA tokens linked to student accounts. In accordance with EU cybersecurity policy and internal ICT regulations, all accounts must complete the following steps before 5 January 2026:

1) Generate new MFA token in Teams → Security Panel  
2) Update password to minimum 12 chars + symbol  
3) Log out of all browsers and campus workstations  
4) Confirm compliance by submitting verification form  

Accounts failing to update will be temporarily restricted from:
• Eduroam login
• VPN remote access
• Moodle assignment submission
• Internship documentation uploads

Note: This message is not disciplinary. It is a compliance requirement for continued system access.
`
},

{
subject:"Internship & Graduation: January 2026 Scheduling Update",
from:"fontys.news.reseller@outlook.com",
date:"2025-12-11 08:30",
read:false,
body:`
This message concerns internship preparation and graduation planning.

Important points:
• Companies requesting NDAs must submit approval via official portal
• Required documents: Learning Agreement, Risk Form, GDPR checklist
• Students traveling outside the EU must report itinerary for insurance coverage
• Weekly check-in meetings start 10 January (mandatory attendance)

Portal link:
Teams → Dashboard → Internships → Document Center → Upload
`
}

],


Sent:[
{
subject:"Project submission – final_report_v3.pdf",
from:"maksim.semeniuk@student.fontys.nl",
date:"2025-12-18 16:40",
read:true,
body:`Here is my final report submission. Attached: 📎 final_report_v3.pdf`
}
],

Drafts:[],
Trash:[]

};

localStorage.setItem(STORAGE, JSON.stringify(mailData));
}


/* INIT LOADING */
let currentFolder = "Inbox";
window.addEventListener("DOMContentLoaded", ()=> setFolder("Inbox"));

const avatarUpload = document.getElementById("avatarUpload");
if(avatarUpload){
  avatarUpload.addEventListener("change", e=>{
    const file = e.target.files[0];
    if(file){
      const url = URL.createObjectURL(file);
      document.getElementById("avatarPreview").src = url;
      localStorage.setItem("profile_avatar", url);
    }
  });

  const saved = localStorage.getItem("profile_avatar");
  if(saved) document.getElementById("avatarPreview").src = saved;
}

// Restore avatar if saved
const storedAvatar = localStorage.getItem("profile_avatar");
if(storedAvatar) avatarPreview.src = storedAvatar;

avatarUpload.onchange = e => {
  const file = e.target.files[0];
  if(!file) return;
  const url = URL.createObjectURL(file);
  avatarPreview.src = url;
  localStorage.setItem("profile_avatar", url);
};

// Editing toggle
let editing = false;
const fields = ["profileName","profileRole","profileEmail","profileAbout","profileSkills","profileEducation","profileAccess"];

editProfileBtn.onclick = () => {
  editing = !editing;
  fields.forEach(id => document.getElementById(id).disabled = !editing);
  editProfileBtn.textContent = editing ? "💾 Save" : "✏️ Edit Profile";

  if(!editing){
    const data = {};
    fields.forEach(id => data[id] = document.getElementById(id).value);
    localStorage.setItem("profile_data", JSON.stringify(data));
  }
};

// Load saved data
const saved = JSON.parse(localStorage.getItem("profile_data") || "null");
if(saved){
  fields.forEach(id => document.getElementById(id).value = saved[id]);
}
