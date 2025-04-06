// HTML content to be injected
const signItHTML = `
    <main>
        <section style="margin-top: 0px; margin-bottom: 0px;">
            <h2 style="margin-top: auto; margin-bottom: 15px;">Link To Your IPA File & Certificate Information <i class="fa-solid fa-circle-chevron-down"></i></h2>
<hr style="width: 10%; margin: 0 auto;">
<input style="margin-top: 15px;margin-bottom: 15px;" type="text" id="urlInput" placeholder="Enter IPA file link here...">
<input style="margin-top: 0px;margin-bottom: 0px;" type="text" id="certp12Input" placeholder="Enter P12 file link here...">
<input style="margin-top: 15px;margin-bottom: 15px;" type="text" id="certpassInput" placeholder="Enter certificate password here...">
<input style="margin-top: 0px;margin-bottom: 15px;" type="text" id="mobileprovisionInput" placeholder="Enter provisioning file link here...">

            <button id="generateLinkButton" style="margin-top: 0px"; margin-bottom:0px;">Sign IPA File <i class="fa-solid fa-file-pen"></i></button>

<p class="info" style="margin-top:15px; margin-bottom: 0px;">Your IPA file will be signed via the <a href="https://cococloud-signing.online" target="_blank">CocoCloud API <i class="fa-solid fa-link"></i></a>. For resources, check out <a href="https://nabzclan.vip/resources/" target="_blank">Nabzclans's Resources Page <i class="fa-solid fa-link"></i></a>. <i class="fa-solid fa-circle-info"></i></p>
        </section>

        <section id="installLinkSection" style="display: none;margin-top: 0px;">
<hr style="margin-bottom: 15px; margin-top: 15px;">
            <h2 style="margin-bottom: 15px; margin-top: 0px;">Install Signed IPA File <i class="fa-solid fa-circle-chevron-down"></i></h2>	
<hr style="width: 10%; margin: 0 auto;">
            <p style="margin-top:15px;margin-bottom:0px;"id="linkOutput"></p>

<button onclick="copyLink()" style="margin-top: 15px; margin-bottom: 0px;">Copy Installation Link <i class="fa-solid fa-copy"></i></button>

    <button id="installButton">Install (Direct) <i class="fa-solid fa-download"></i></button>

<p style="margin-bottom: 0px; margin-top: 0px;"></p>
           
        </section>
    </main>
`;

// Function to insert HTML into an element with ID "appContainer"
function insertSignItHTML(targetElementId) {
    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
        targetElement.innerHTML = signItHTML;
        
        // Dispatch a custom event to signal that content has been loaded
        document.dispatchEvent(new Event('contentLoaded'));
    } else {
        console.error("Main display is not available.");
    }
}

// Load the HTML on window load
window.onload = () => {
    insertSignItHTML("appContainer");
};
