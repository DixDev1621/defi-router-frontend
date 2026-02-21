const API_URL = "https://defi-router-backend-3.onrender.com";

// ---------- REGISTER ----------
async function registerUser() {
  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    // 🔍 DEBUG PART
    const rawText = await response.text();
    console.log("RAW REGISTER RESPONSE:", rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      alert("Backend returned HTML instead of JSON. Check backend route.");
      return;
    }

    if (!response.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("🎉 Account created successfully!");
    window.location.href = "login.html";

  } catch (error) {
    console.error("Register error:", error);
    alert("Unable to connect to backend. Check network or CORS.");
  }
}


// ---------- LOGIN ----------
async function loginUser() {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    // 🔍 DEBUG PART
    const rawText = await response.text();
    console.log("RAW LOGIN RESPONSE:", rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      alert("Backend returned HTML instead of JSON. Check backend route.");
      return;
    }

    if (!response.ok) {
      alert(data.message || "Invalid credentials");
      return;
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("✅ Welcome back!");
      window.location.href = "index.html";
    } else {
      alert("Login failed");
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Unable to connect to backend. Check network or CORS.");
  }
}


// ---------- LOGOUT ----------
function logoutUser() {
  localStorage.removeItem("token");
  alert("👋 Logged out successfully");
  window.location.href = "login.html";
}