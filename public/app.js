async function testServer() {
    const serverUrl = document.getElementById('serverUrl').value;
    const connectivityStatus = document.querySelector('#connectivity .status');
    const functionalityStatus = document.querySelector('#functionality .status');

    // Reset statuses
    connectivityStatus.className = 'status';
    functionalityStatus.className = 'status';
    connectivityStatus.textContent = 'Testing...';
    functionalityStatus.textContent = 'Testing...';

    try {
        const response = await fetch('/.netlify/functions/test-server', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: serverUrl })
        });

        const result = await response.json();

        updateStatus(connectivityStatus, result.connectivity);
        updateStatus(functionalityStatus, result.functionality);
    } catch (error) {
        connectivityStatus.textContent = 'Test failed';
        connectivityStatus.classList.add('error');
        console.error('Test failed:', error);
    }
}

function updateStatus(element, result) {
    element.textContent = result.message;
    element.classList.add(result.success ? 'success' : 'error');
}