function createSLORequest(nameID, issuer, destination, sessionIndex) {
    const sloRequestTemplate = `
        <samlp:LogoutRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
                            ID="_${generateUniqueID()}"
                            Version="2.0"
                            IssueInstant="${new Date().toISOString()}"
                            Destination="${destination}">
            <saml:Issuer xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">${issuer}</saml:Issuer>
            <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified">${nameID}</saml:NameID>
            ${sessionIndex ? `<samlp:SessionIndex>${sessionIndex}</samlp:SessionIndex>` : ''}
        </samlp:LogoutRequest>
    `.trim();

    return encodeSAMLRequest(sloRequestTemplate);
}

function generateUniqueID() {
    // Simple example, should be replaced with a more robust unique ID generator
    return Math.random().toString(36).substring(2, 15);
}

function encodeSAMLRequest(samlRequest) {
    // Simple base64 encoding without deflation
    return btoa(unescape(encodeURIComponent(samlRequest)));
}

function sendSLORequest() {
    const nameID = '';
    const issuer = '';
    const destination = ''; // Replace with actual IdP logout URL
    const sessionIndex = ''; // Optional, use actual session index if available

    const encodedSLORequest = createSLORequest(nameID, issuer, destination, sessionIndex);

    // Create a form and submit it
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = destination;

    const samlRequestInput = document.createElement('input');
    samlRequestInput.type = 'hidden';
    samlRequestInput.name = 'SAMLRequest';
    samlRequestInput.value = encodedSLORequest;

    form.appendChild(samlRequestInput);
    document.body.appendChild(form);
    form.submit();
}

// Example usage
sendSLORequest();
