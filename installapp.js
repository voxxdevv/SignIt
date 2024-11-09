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
            <key>Label</key>
            <string>SignIt</string>
            <key>Precomposed</key>
            <true/>
            <key>URL</key>
            <string>https://usesignit.netlify.app/appdisplay.html</string>
            <key>Icon</key>
            <data>
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
            </data>
          <key>PayloadIdentifier</key>
            <string>com.signit.app</string>
            <key>PayloadType</key>
            <string>com.apple.webClip.managed</string>
            <key>PayloadUUID</key>
            <string>${payloadUUID}</string>
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
    <string>${profileUUID}</string>
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