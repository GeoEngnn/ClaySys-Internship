// Table Creation
const tableBody = document.getElementById("my-requests-table-body");

async function displayMyRequests() {
    try {     
        const response = await fetch("http://localhost:5273/api/requests");

        if (!response.ok) {
            throw new Error("Failed to retrieve service requests");
        }

        // requests becomes a JavaScript array containing two objects.

        const requests = await response.json(); 

        tableBody.innerHTML = "";

        if (requests.length === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");

            cell.colSpan = 6;
            cell.textContent = "No service requests found.";

            row.appendChild(cell);
            tableBody.appendChild(row);

            return;
        }

        requests.forEach(request => {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = request.id;

            const titleCell = document.createElement("td");
            titleCell.textContent = request.title;

            const categoryCell = document.createElement("td");
            categoryCell.textContent = request.category;

            const priorityCell = document.createElement("td");
            priorityCell.textContent = request.priority;

            const statusCell = document.createElement("td");
            statusCell.textContent = request.status;

            const dateCell = document.createElement("td");
            dateCell.textContent = request.targetDate
                ? request.targetDate.substring(0, 10)
                : "Not set";

            row.append(
                idCell,
                titleCell,
                categoryCell,
                priorityCell,
                statusCell,
                dateCell
            );

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading requests:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="6">Unable to load service requests.</td>
            </tr>
        `;
    }
}

displayMyRequests();
