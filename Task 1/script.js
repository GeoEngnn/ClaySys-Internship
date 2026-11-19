                // Form elements
const requestForm = document.getElementById("request-form");

const titleInput = document.getElementById("request-title");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const assetTagInput = document.getElementById("asset-tag");

const priorityInput = document.getElementById("priority");
const targetDateInput = document.getElementById("target-date");

const previewTitle = document.getElementById("preview-title");
const previewCategory = document.getElementById("preview-category");
const previewAsset = document.getElementById("preview-asset");
const previewPriority = document.getElementById("preview-priority");
const previewDate = document.getElementById("preview-date");

const saveDraftButton = document.getElementById("save-draft");
const requestsTableBody = document.getElementById("requests-table-body");


                // Validation logic when submitted 
requestForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const impact = document.querySelector('input[name="impact"]:checked');
    const urgency = document.querySelector('input[name="urgency"]:checked');

    if (!impact || !urgency) {
        alert("Please select both Business Impact and Urgency.");
        return;
    }

    // checks your HTML constraints

    if (!requestForm.checkValidity()) {      
        requestForm.reportValidity();
        return;
    }
    updatePreview();

    const requestData = getFormData();

    // Retrieve existing requests
    let requests = JSON.parse(localStorage.getItem("serviceRequests")) || [];

    // Add the new request
    requests.push(requestData);

    // Store the updated array
    localStorage.setItem("serviceRequests", JSON.stringify(requests));

    displayRequests();

    alert("Request submitted successfully!");

    requestForm.reset();
    updatePreview();

});

function getFormData() {

    const impact = document.querySelector('input[name="impact"]:checked');
    const urgency = document.querySelector('input[name="urgency"]:checked');

    return {
        id: Date.now(),
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        category: categoryInput.value,
        assetTag: assetTagInput.value.trim(),
        impact: impact ? impact.value : "",
        urgency: urgency ? urgency.value : "",
        priority: priorityInput.value,
        targetDate: targetDateInput.value,
        status: "Submitted"
    };
}

                // Table Creation

function displayRequests() {

    const requests = JSON.parse(localStorage.getItem("serviceRequests")) || [];

    requestsTableBody.innerHTML = "";  // Removing the current table body content and 

    requests.forEach(function(request) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${request.id}</td>
            <td>${request.title}</td>
            <td>${request.category}</td>
            <td>${request.priority}</td>
            <td>${request.targetDate}</td>
            <td>${request.status}</td>
        `;

        requestsTableBody.appendChild(row);

    });
}
displayRequests();



                    // Implement Live Preview

function updatePreview() {

    // Request Title
    previewTitle.textContent =
        titleInput.value.trim() || "Untitled Request";

    // Category
    previewCategory.textContent =
        categoryInput.value || "Not selected";

    // Asset Tag
    previewAsset.textContent =
        assetTagInput.value.trim() || "Not provided";

    // Priority
    const priority = calculatePriority();

    priorityInput.value = priority;
    previewPriority.textContent = priority;

    // Target Date
    previewDate.textContent =
        targetDateInput.value || "Pending";
}

titleInput.addEventListener("input", updatePreview);
categoryInput.addEventListener("change", updatePreview);
assetTagInput.addEventListener("input", updatePreview);
priorityInput.addEventListener("input", updatePreview);
targetDateInput.addEventListener("change", updatePreview);

updatePreview();


            // Priority calculation function

function calculatePriority() {

    const impact = document.querySelector('input[name="impact"]:checked');
    const urgency = document.querySelector('input[name="urgency"]:checked');

    // Default priority
    let priority = "Low";

    if (!impact || !urgency) {
        return priority;
    }

    if (impact.value === "work-stopped") {
        priority = "High";
    }
    else if (
        impact.value === "team" &&
        (urgency.value === "needed-soon" || urgency.value === "immediate")
    ) {
        priority = "Medium";
    }

    return priority;
}

document.querySelectorAll('input[name="impact"]').forEach(function(radio) {
    radio.addEventListener("change", updatePreview);
});

document.querySelectorAll('input[name="urgency"]').forEach(function(radio) {
    radio.addEventListener("change", updatePreview);
});