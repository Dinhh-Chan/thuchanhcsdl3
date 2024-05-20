async function submitForm() {
    const operandA = parseFloat(document.getElementById('operandA').value);
    const operandB = parseFloat(document.getElementById('operandB').value);

    if (isNaN(operandA) || isNaN(operandB)) {
        document.getElementById('result').innerText = "Please enter valid numbers.";
        return;
    }

    const operations = ['add', 'subtract', 'multiply', 'divide'];
    let results = [];

    for (const operation of operations) {
        try {
            const response = await fetch(`http://localhost:8000/${operation}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ a: operandA, b: operandB })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await response.json();
            results.push(data);
        } catch (error) {
            results.push({ operation, error: error.message });
        }
    }

    displayResult(results);
}

function displayResult(data) {
    let resultHTML = '';
    for (const item of data) {
        if (item.error) {
            resultHTML += `<p>${item.operation} error: ${item.error}</p>`;
        } else {
            resultHTML += `<p>${item.operation} result: ${item.result}</p>`;
        }
    }
    document.getElementById('result').innerHTML = resultHTML;
}
