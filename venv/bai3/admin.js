document.addEventListener('DOMContentLoaded', async function() {
    const studentsTableBody = document.getElementById('studentsTable').querySelector('tbody');

    try {
        const response = await fetch('http://localhost:8000/students');
        const students = await response.json();

        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.address}</td>
                <td>${student.phone}</td>
                <td>${student.email}</td>
                <td>${student.class}</td>
            `;
            studentsTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});
