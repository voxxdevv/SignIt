function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document.getElementById('installButton').addEventListener('click', function() {
    const payloadUUID = generateUUID(); // Generate a unique UUID for the payload
    const profileUUID = generateUUID(); // Generate a unique UUID for the profile

    // Create the plist content with dynamic UUIDs
    const plistContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>FullScreen</key>
            <true/>
            <key>IgnoreManifestScope</key>
            <false/>
            <key>IsRemovable</key>
            <false/>
            <key>Precomposed</key>
            <false/>
            <key>Label</key>
            <string>SignIt</string>
            <key>Precomposed</key>
            <false/>
            <key>URL</key>
            <string>https://usesignit.netlify.app/internaldisplay.html</string>
            <key>Icon</key>
            <string>ico/apple-touch-icon.png</string> <!-- Replace with your icon URL -->
            <key>PayloadIdentifier</key>
            <string>com.signit.app</string>
            <key>PayloadType</key>
        <string>com.apple.webClip.managed</string>
            <key>PayloadUUID</key>
            <string>${payloadUUID}</string> <!-- Insert generated payload UUID -->
            <key>PayloadVersion</key>
            <integer>1</integer>
        </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>SignIt iOS App</string>
    <key>PayloadIdentifier</key>
    <string>com.signit.app</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>${profileUUID}</string> <!-- Insert generated profile UUID -->
    <key>PayloadVersion</key>
    <integer>1</integer>
    <key>PayloadDescription</key>
    <string>Use this configuration profile to install the official SignIt iOS app.</string>
</dict>
</plist>`;

    // Create a Blob with the plist content
    const blob = new Blob([plistContent], { type: 'application/x-apple-aspen-config' });
    const url = URL.createObjectURL(blob);

    // Open the file in a new tab to prompt download and installation
    window.location.href = url;

    // Optional: Display installation instructions
    document.getElementById('instructions').style.display = 'block';
});