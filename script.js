let generatedLink = ""; // Global variable to store the generated link

document.getElementById('generateLinkButton').addEventListener('click', () => {
    const urlInput = document.getElementById('urlInput').value.trim(); // Get the IPA URL input
    const certp12URL = document.getElementById('certp12Input').value.trim(); // Get the P12 cert URL input
    const certmobileprovisionURL = document.getElementById('mobileprovisionInput').value.trim(); // Get the mobile provision URL input
    const certpass = document.getElementById('certpassInput').value.trim(); // Get the cert pass input
    
    // Check if mandatory inputs are provided (url, certp12URL, and certmobileprovisionURL)
    if (urlInput && certp12URL && certmobileprovisionURL) {
        // Construct the installation link using all provided inputs, only include certpass if it's provided
        generatedLink = `https://api.cococloud-signing.online/signing-owncert?certp12URL=${encodeURIComponent(certp12URL)}&certmobileprovisionURL=${encodeURIComponent(certmobileprovisionURL)}${certpass ? `&certpass=${encodeURIComponent(certpass)}` : ''}&url=${encodeURIComponent(urlInput)}`;
        
        // Output the generated link for debugging
        document.getElementById('linkOutput').innerHTML = `<input type="text" value="${generatedLink}" id="linkBox" disabled>`;
        
        // Show the install link section
        document.getElementById('installLinkSection').style.display = 'block'; 
    } else {
        alert("Please enter all required links."); // Alert if any required input is empty
    }
});

document.getElementById('installButton').addEventListener('click', () => {
    if (generatedLink) {
        window.location.href = generatedLink; // Navigate to the generated link
    } else {
        alert("No installation link found."); // Alert if no link has been generated
    }
});

function copyLink() {
    // Get the text field
    var copyText = document.getElementById("linkBox");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    alert("Copied the installation link.");
}