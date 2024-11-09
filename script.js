let generatedLink = ""; // Global variable to store the generated link

// Wait for the `contentLoaded` event before setting up event listeners
document.addEventListener('contentLoaded', () => {
    // Set up event listener for the Generate Link button
    document.getElementById('generateLinkButton').addEventListener('click', () => {
        const urlInput = document.getElementById('urlInput').value.trim();
        const certp12URL = document.getElementById('certp12Input').value.trim();
        const certmobileprovisionURL = document.getElementById('mobileprovisionInput').value.trim();
        const certpass = document.getElementById('certpassInput').value.trim();
        
        // Validate required inputs
        if (urlInput && certp12URL && certmobileprovisionURL) {
            // Construct the installation link
            generatedLink = `https://api.cococloud-signing.online/signing-owncert?certp12URL=${encodeURIComponent(certp12URL)}&certmobileprovisionURL=${encodeURIComponent(certmobileprovisionURL)}${certpass ? `&certpass=${encodeURIComponent(certpass)}` : ''}&url=${encodeURIComponent(urlInput)}`;
            
            // Display the generated link in an input field
            document.getElementById('linkOutput').innerHTML = `<input type="text" value="${generatedLink}" id="linkBox" disabled>`;
            
            // Show the install link section
            document.getElementById('installLinkSection').style.display = 'block';
        } else {
            alert("Please enter all required links.");
        }
    });

    // Set up event listener for the Install button
    document.getElementById('installButton').addEventListener('click', () => {
        if (generatedLink) {
            window.location.href = generatedLink;
        } else {
            alert("No installation link found.");
        }
    });
});

// Copy link function
function copyLink() {
    const copyText = document.getElementById("linkBox");
    if (copyText) {
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(copyText.value);
        alert("Copied the installation link.");
    } else {
        alert("No installation link found.");
    }
}