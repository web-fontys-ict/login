/* ===================== LOGIN SYSTEM ===================== */
document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("forgotPw").addEventListener("click", ()=> {
  document.getElementById("resetPopup").classList.add("open");
});
document.getElementById("resetClose").addEventListener("click", ()=> {
  document.getElementById("resetPopup").classList.remove("open");
});
document.getElementById("resetSend").addEventListener("click", ()=> {
  const mail = document.getElementById("resetMail").value.trim();
  if(!mail) return;
  alert("Password reset link sent to: " + mail);
  document.getElementById("resetPopup").classList.remove("open");
});


function login(){
  const email = document.getElementById("loginEmail").value.trim();
  const pass  = document.getElementById("loginPass").value.trim();
  const status = document.getElementById("loginStatus");

  const validEmail = "maksim.semeniuk@student.fontys.nl";
  const validPass  = "Azjmyu12";

  if(email === validEmail && pass === validPass){
      status.innerHTML = "✔ Login successful, redirecting...";
      status.style.color = "#4af88b";

      // MARK USER AS LOGGED IN
      localStorage.setItem("auth", "true");

      // REDIRECT TO DASHBOARD
      setTimeout(()=> {
        window.location.href = "index.html"; // или dashboard.html, если так названо
      }, 600);
  } else {
      status.innerHTML = "❌ Wrong email or password";
      status.style.color = "#ff4e4e";
  }
}

/* ==== BLOCK ACCESS IF NOT LOGGED ==== */
if(location.pathname.endsWith("index.html")
|| location.pathname.endsWith("dashboard.html")){
  if(localStorage.getItem("auth") !== "true"){
    window.location.href = "login.html";
  }
}
