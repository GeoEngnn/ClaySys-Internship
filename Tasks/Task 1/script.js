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

requestForm.addEventListener("submit", async function(event) {

    event.preventDefault();
    //normally the page reloads and sends data to the server

    const impact = document.querySelector('input[name="impact"]:checked');
    const urgency = document.querySelector('input[name="urgency"]:checked');

    if (!impact || !urgency) {
        alert("Please select both Business Impact and Urgency.");
        return;
    }

    if (!requestForm.checkValidity()) {
        requestForm.reportValidity();
        return;
    // Checks whether the form satisfies the validation rules defined in your HTML.
    // If the form is invalid, this method asks the browser to display its built-in validation message.

    }

    updatePreview();

    const requestData = getFormData();

    // (POST)
    try {
        const response = await fetch("http://localhost:5273/api/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error("Failed to submit request");
        }

        const result = await response.json();

        console.log("Request submitted:", result);

    } catch (error) {
        console.error("Submission error:", error);
        alert("Unable to submit request. Please try again.");
        return;
    }

    // POST succeeded
    alert("Request submitted successfully!");

    requestForm.reset();
    updatePreview();

    // To display the recent request after we do the Post (GET)
    try {
        await displayRequests();
    } catch (error) {
        console.error("Table refresh error:", error);
    }

});


function getFormData() {

    const impact = document.querySelector('input[name="impact"]:checked');
    const urgency = document.querySelector('input[name="urgency"]:checked');

    return {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        category: categoryInput.value,
        assetTag: assetTagInput.value.trim() || null,
        impact: impact ? impact.value : "",
        urgency: urgency ? urgency.value : "",
        priority: priorityInput.value,
        targetDate: targetDateInput.value || null,
        status: "Submitted"
    };
}

                    // Implement Live Preview

function updatePreview() {

// || is logical 'OR' So if the left side is truthy, JavaScript returns it and never evaluates the right side.

    previewTitle.textContent =
        titleInput.value.trim() || "Untitled Request";

    
    previewCategory.textContent =
        categoryInput.value || "Not selected";


    previewAsset.textContent =
        assetTagInput.value.trim() || "Not provided";

    const priority = calculatePriority();

    priorityInput.value = priority;
    previewPriority.textContent = priority;

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



