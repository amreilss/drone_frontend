export function loadTempPage() {
  document.getElementById("contentArea").innerHTML = `
    <div class="card">
      <h2 class="card-title">🌡️ Temperature Log Form</h2>
      <form id="logForm">
        <label for="temperature">Temperature (°C)</label>
        <input type="number" id="temperature" name="temperature" required step="0.1" placeholder="Enter temperature" />
        <button type="submit" class="submit-btn">Submit</button>
      </form>
    </div>
  `;

  const form = document.getElementById("logForm");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const temp = document.getElementById("temperature").value;
    try {
      const res = await fetch(`${API_BASE}/logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ drone_id: DRONE_ID, drone_name: DRONE_NAME, country: COUNTRY, celsius: parseFloat(temp) })
      });
      alert(res.ok ? "✅ Log submitted!" : "❌ Submit failed");
    } catch {
      alert("⚠️ Network error");
    }
  });
}
