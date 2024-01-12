<?php

function createSLORequest($nameID, $issuer, $destination, $sessionIndex) {
    $uniqueID = generateUniqueID();
    $issueInstant = gmdate("Y-m-d\TH:i:s\Z");

    $sloRequestTemplate = "<samlp:LogoutRequest xmlns:samlp=\"urn:oasis:names:tc:SAML:2.0:protocol\""
                        . " ID=\"_$uniqueID\""
                        . " Version=\"2.0\""
                        . " IssueInstant=\"$issueInstant\""
                        . " Destination=\"$destination\">"
                        . "<saml:Issuer xmlns:saml=\"urn:oasis:names:tc:SAML:2.0:assertion\">$issuer</saml:Issuer>"
                        . "<saml:NameID Format=\"urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified\">$nameID</saml:NameID>"
                        . (!empty($sessionIndex) ? "<samlp:SessionIndex>$sessionIndex</samlp:SessionIndex>" : '')
                        . "</samlp:LogoutRequest>";

    return encodeSAMLRequest($sloRequestTemplate);
}

function generateUniqueID() {
    // A simple unique ID generator (better to use a more robust method in production)
    return bin2hex(random_bytes(8));
}

function encodeSAMLRequest($samlRequest) {
    // Base64 encoding without deflation
    return base64_encode($samlRequest);
}

// Example usage
$nameID = '';
$issuer = '';
$destination = ''; // Replace with actual IdP logout URL
$sessionIndex = ''; // Optional, use actual session index if available

$encodedSLORequest = createSLORequest($nameID, $issuer, $destination, $sessionIndex);

// Output the SAML request (for testing purposes)
echo htmlspecialchars($encodedSLORequest);
?>
