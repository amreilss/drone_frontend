export async function loadLogsPage() {
  document.getElementById("contentArea").innerHTML = `
    <div class="card">
      <h2 class="card-title">📊 Drone Logs</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr><th>Created</th><th>Country</th><th>Drone ID</th><th>Drone Name</th><th>Celsius</th></tr>
          </thead>
          <tbody id="logTableBody"><tr><td colspan="5">Loading...</td></tr></tbody>
        </table>
      </div>
    </div>
  `;

  try {
    const res = await fetch(`${API_BASE}/logs/${DRONE_ID}`);
    const logs = await res.json();
    const tbody = document.getElementById("logTableBody");
    tbody.innerHTML = logs.length
      ? logs.map(log => `
        <tr>
          <td>${log.created}</td>
          <td>${log.country}</td>
          <td>${log.drone_id}</td>
          <td>${log.drone_name}</td>
          <td>${log.celsius}°C</td>
        </tr>`).join("")
      : `<tr><td colspan="5">No logs found</td></tr>`;
  } catch {
    document.getElementById("logTableBody").innerHTML = `<tr><td colspan="5" style="color:red;">Error loading logs</td></tr>`;
  }
}
