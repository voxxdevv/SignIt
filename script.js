let generatedLink = ""; // Global variable to store the generated link

// Wait for the `contentLoaded` event before setting up event listeners
document.addEventListener('contentLoaded', () => {
    // Set up event listener for the Generate Link button
    document.getElementById('generateLinkButton').addEventListener('click', async () => {
        const urlInput = document.getElementById('urlInput').value.trim();
        const certp12URL = document.getElementById('certp12Input').value.trim();
        const certmobileprovisionURL = document.getElementById('mobileprovisionInput').value.trim();
        const certpass = document.getElementById('certpassInput').value.trim();
        
        const ipaFile = document.getElementById('ipaFile').files[0];
        const p12File = document.getElementById('p12File').files[0];
        const provisionFile = document.getElementById('provisionFile').files[0];

        // Function to convert file to base64
        const fileToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = error => reject(error);
            });
        };

        try {
            // Prepare parameters based on whether files or URLs are provided
            let params = [];
            
            if (ipaFile) {
                const base64IPA = await fileToBase64(ipaFile);
                params.push(`url=data:application/octet-stream;base64,${base64IPA}`);
            } else if (urlInput) {
                params.push(`url=${encodeURIComponent(urlInput)}`);
            }

            if (p12File) {
                const base64P12 = await fileToBase64(p12File);
                params.push(`certp12URL=data:application/x-pkcs12;base64,${base64P12}`);
            } else if (certp12URL) {
                params.push(`certp12URL=${encodeURIComponent(certp12URL)}`);
            }

            if (provisionFile) {
                const base64Provision = await fileToBase64(provisionFile);
                params.push(`certmobileprovisionURL=data:application/octet-stream;base64,${base64Provision}`);
            } else if (certmobileprovisionURL) {
                params.push(`certmobileprovisionURL=${encodeURIComponent(certmobileprovisionURL)}`);
            }

            if (certpass) {
                params.push(`certpass=${encodeURIComponent(certpass)}`);
            }

            // Validate required inputs
            if ((urlInput || ipaFile) && (certp12URL || p12File) && (certmobileprovisionURL || provisionFile)) {
                // Construct the installation link
                generatedLink = `https://api.cococloud-signing.online/signing-owncert?${params.join('&')}`;
                
                // Display the generated link in an input field
                document.getElementById('linkOutput').innerHTML = `<input type="text" value="${generatedLink}" id="linkBox" disabled>`;
                
                // Show the install link section
                document.getElementById('installLinkSection').style.display = 'block';
            } else {
                alert("Please provide all required files or links.");
            }
        } catch (error) {
            alert("Error processing files: " + error.message);
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
