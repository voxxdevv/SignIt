let generatedLink = ""; // Store the returned installation link from backend

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const ipaFile = document.getElementById('ipaFile').files[0];
        const p12File = document.getElementById('certp12File').files[0];
        const provisionFile = document.getElementById('mobileprovisionFile').files[0];
        const certpass = document.getElementById('certpassInput').value.trim();

        if (!ipaFile || !p12File || !provisionFile) {
            alert("Please upload all required files.");
            return;
        }

        const formData = new FormData();
        formData.append('ipa', ipaFile);
        formData.append('p12', p12File);
        formData.append('mobileprovision', provisionFile);
        formData.append('certpass', certpass);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.link) {
                generatedLink = result.link;
                document.getElementById('linkOutput').innerHTML = `
                    <input type="text" value="${generatedLink}" id="linkBox" disabled>
                    <button onclick="copyLink()">Copy</button>
                `;
                document.getElementById('installLinkSection').style.display = 'block';
            } else {
                alert("Failed to generate link.");
            }
        } catch (err) {
            console.error(err);
            alert("Error uploading files.");
        }
    });

    document.getElementById('installButton').addEventListener('click', () => {
        if (generatedLink) {
            window.location.href = generatedLink;
        } else {
            alert("No installation link found.");
        }
    });
});

function copyLink() {
    const copyText = document.getElementById("linkBox");
    if (copyText) {
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        alert("Copied the installation link.");
    } else {
        alert("No installation link found.");
    }
}

window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    setTimeout(() => {
        loader.classList.add('loader-hidden');
        content.classList.add('content-loaded');
        loader.addEventListener('transitionend', () => {
            loader.remove();
        });
    }, 1000);
});
