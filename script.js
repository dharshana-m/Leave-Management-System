document.addEventListener("DOMContentLoaded", function() {
    const leaveForm = document.getElementById("leave-form");
    const leaveRequestsTable = document.getElementById("leave-requests");

    if (leaveForm) {
        leaveForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("employee-name").value;
            const leaveType = document.getElementById("leave-type").value;
            const startDate = document.getElementById("leave-start").value;
            const endDate = document.getElementById("leave-end").value;

            if (validateForm(name, leaveType, startDate, endDate)) {
                const leaveRequest = {
                    name: name,
                    leaveType: leaveType,
                    startDate: startDate,
                    endDate: endDate,
                    status: "Pending"
                };

                // Save leaveRequest to backend or local storage
                saveLeaveRequest(leaveRequest);

                // Redirect to the submission successful page
                window.location.href = 'submit_success.html';
            } else {
                alert("Please fill out all fields correctly.");
            }
        });
    }

    if (leaveRequestsTable) {
        // Load leave requests from backend or local storage
        const leaveRequests = loadLeaveRequests();
        renderLeaveRequests(leaveRequests);
    }

    function validateForm(name, leaveType, startDate, endDate) {
        // Add your validation logic here
        return name !== "" && leaveType !== "" && startDate !== "" && endDate !== "";
    }

    function saveLeaveRequest(leaveRequest) {
        // Save the leave request to local storage or send it to a backend server
        let leaveRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
        leaveRequests.push(leaveRequest);
        localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));
    }

    function loadLeaveRequests() {
        // Load leave requests from local storage or fetch from a backend server
        return JSON.parse(localStorage.getItem("leaveRequests")) || [];
    }

    function renderLeaveRequests(leaveRequests) {
        leaveRequests.forEach(request => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${request.name}</td>
                <td>${request.leaveType}</td>
                <td>${request.startDate}</td>
                <td>${request.endDate}</td>
                <td>${request.status}</td>
            `;
            leaveRequestsTable.appendChild(row);
        });
    }
});