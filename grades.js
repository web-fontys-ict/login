/* ================= STORAGE ================= */
const G_KEY = "fontys_grades";
let grades = JSON.parse(localStorage.getItem(G_KEY) || "[]");

/* ================= RENDER TABLE ================= */
function renderGrades(){
  const tbody = document.getElementById("grades_table");
  tbody.innerHTML = "";

  grades.forEach(g=>{
    const cls = parseFloat(g.score) >= 5.5 ? "grade-pass" : "grade-fail";
    tbody.innerHTML += `
      <tr>
        <td>${g.title}</td>
        <td>${g.course}</td>
        <td>${g.type}</td>
        <td>${g.teacher}</td>
        <td class="${cls}">${g.score}</td>
        <td>${g.date}</td>
      </tr>
    `;
  });

  renderStats();
}

/* ================= STATS (SUMMARY) ================= */
function renderStats(){
  if(grades.length === 0){
    document.getElementById("gradeStats").innerHTML = "No grades recorded.";
    return;
  }

  const avg = (
    grades.reduce((a,b)=>a + parseFloat(b.score), 0) / grades.length
  ).toFixed(2);

  const passed = grades.filter(g => parseFloat(g.score) >= 5.5).length;
  const failed = grades.length - passed;

  document.getElementById("gradeStats").innerHTML = `
    📌 <b>Total:</b> ${grades.length} assessments |
    ✔️ Passed: <b>${passed}</b> |
    ❌ Failed / Resit: <b>${failed}</b> |
    📈 Average Score: <b>${avg}/10</b>
  `;
}

window.addEventListener("DOMContentLoaded", renderGrades);
