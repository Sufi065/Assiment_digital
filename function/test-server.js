const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { url } = JSON.parse(event.body);
    
    // Validate URL format
    if (!isValidMcpUrl(url)) {
        return respond(400, { error: 'Invalid MCP server URL format' });
    }

    const results = {
        connectivity: await testConnectivity(url),
        functionality: { success: false, message: 'Not tested' }
    };

    if (results.connectivity.success) {
        results.functionality = await testFunctionality(url);
    }

    return respond(200, results);
};

const isValidMcpUrl = (url) => {
    try {
        return new URL(url).protocol.startsWith('http');
    } catch {
        return false;
    }
};

const testConnectivity = async (url) => {
    try {
        const response = await fetchWithTimeout(url, { timeout: 5000 });
        return {
            success: response.ok,
            message: response.ok ? 'Connected successfully' : `Connection failed (HTTP ${response.status})`
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const testFunctionality = async (url) => {
    try {
        const response = await fetchWithTimeout(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "mcp-tester",
                prompt: "Test prompt to verify MCP functionality",
                parameters: {}
            }),
            timeout: 5000
        });

        const data = await response.json();
        return {
            success: response.ok && data?.success !== false,
            message: response.ok ? 'Functionality verified' : 'Functional test failed'
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const fetchWithTimeout = (url, options = {}) => {
    const { timeout = 5000, ...fetchOptions } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    return fetch(url, { ...fetchOptions, signal: controller.signal })
        .finally(() => clearTimeout(timeoutId));
};

const respond = (statusCode, body) => ({
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
});