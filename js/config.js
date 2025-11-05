export async function loadConfigPage() {
  document.getElementById("contentArea").innerHTML = `
    <div class="card">
      <h2 class="card-title">⚙️ Drone Configuration</h2>
      <div id="configData" class="loading">Loading...</div>
    </div>
    <div class="card">
      <div class="drone-showcase">
        <img src="./assets/drone_condition.png" alt="Drone" class="drone-image" />
      </div>
    </div>
  `;

  try {
    const res = await fetch(`${API_BASE}/configs/${DRONE_ID}`);
    const data = await res.json();
    document.getElementById("configData").innerHTML = `
      <div class="config-grid">
        <div class="config-item"><div class="config-label">Drone ID</div><div class="config-value">${data.drone_id}</div></div>
        <div class="config-item"><div class="config-label">Drone Name</div><div class="config-value">${data.drone_name}</div></div>
        <div class="config-item"><div class="config-label">Light</div><div class="config-value">${data.light}</div></div>
        <div class="config-item"><div class="config-label">Country</div><div class="config-value">${data.country}</div></div>
        <div class="config-item"><div class="config-label">Weight</div><div class="config-value">${data.weight}</div></div>
      </div>
    `;
  } catch (err) {
    document.getElementById("configData").innerHTML = `<p style="color:red;">❌ Error loading configuration</p>`;
  }
}
