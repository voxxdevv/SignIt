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
            <string>https://usesignit.netlify.app/internaldisplay.html</string>
            <key>Icon</key>
            <data>
iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAMAAAC4A3VPAAAARVBMVEX///9MA4ROCYpSFJNhQbhjR71nUMVQD45fOrNoVclUHJlXI59lTMFZKqVcMKpdNa5rWcv28/qljM/i2u+UeMi1otrIueJlw6LUAAAEN0lEQVRo3uWa23asIAyGp3tQ8YwCvv+jFhBH8AAB0bZrZ+7nWz8hISZ5fWn7p61Q9l6sWqxerNXWzdYrw9qQtmy2RlmurJRGhL00UCMLC1nJ3wxcmK1mdgvTRCLNzGZmo5C5QpYzslyRBtSjsj1W2SdS+REpVNZbld2RSoRnlVmsyuoAuqpsXSrRscoyvUqMdiobQyWxVZ7c2D00TmV5QWUb5UsNJT6VFQD64yoPfJmfBMlOZZFaZX6bL5EzLokrLmNV4t+jUrsyMi6vqCSP+7Isb4hL/Ntu7C3ZB//yuExyY/HDKjPpqcb1Xvp9GaASY8LpIIyO5BmVPR7pSxtlKN6XATd2HF4fG8bEFd6RSosomdmVOhaickP8MO/z5Y646kxU4W1VHhAX5q72iazWOxEC/fqFcEjUzCQVXkv4RIVx1rcuomCyNBUe4gtgmIg81padEEV8khQVXk7Nv2RSJeJnyBdPcGMtojw6N5PmmfvG+uKyrjbEmdmfM4U3r6ncExVTxOUZ00JGVHgGkU7T5xKx3sHcqwyKyw9xGHHbM5uZcZ/KiArPIKrcw6ifScsrvjSJKuF108tg4kMmv/Je7olGzjlj6lQQp9JJ1EycTfskG13hNSZRviTdJq8OTNQ+PbKYA2+ic+zbIiqVu0yumNhkKqJ1sDm8wrM1ysfk4O2YmevZzsQIlZVN1O/z4WtlMwe+FiLmS+L05aIzs4gnGrfMhRjVqeygRMVEM1MQYzqVGsrAxFknws20EOMqvAUpiJWPOOsUTJYhsx8bWuGRAU6UTP25l511tyBdZ67+STedPUTFNFrAMT08Aa0Z50QRKz9R5tXrPby11Q0hypsT0MM77DpXayECIl7vFazYIGJcD2+rMkjjta9ouMbXiPBR1zm0wgvQKIlelQSqEq4Ro8tzErjGdF1nAWUQjbBpEKTCq0DERWMilQRE7H0ThIAKL6NwYoo5iagKJhAx3TToXY0wYsJpkN+RMxE6DfL7sqN+Ytg0yJd9/McqiF3SKW0zQImpZl7VBCAmndIWvrujiF1KX/pEzsTAibszLovcU7OOXfL5JQcRoVNagMoCUw+xTa2yYDBimC9dFV7hvDySmHoW/S7Q4NEYuD3hr/Bc5zqw+Im7Iy4d50rZPZsw52/IlF/ZK3CoPEt2A8d11PaEv1M5nh5qfdO+z3HqkRLryE0Y70tSH7hymMi87nPPJsz+9ghga64YhW/CeCo8vLk9lJO2Wvao7lHZW+3WaUTGHl7sVpPPl0smGOg0Nq29bXhTXDayFUf5SPpafQtd3mryZp930RImTtPoF9y/1fSpZS9vqAX2CqrUu1sE0PdJtaEGnwZVj2+ovZNtG8L3ff6Ayss9vPQ39hlfnjW6/5u4/HrixpLn4/IHcuwzcdkEdyqf3nV+/8BG9x9QeaWHV/yd99IE7jfUFPIbZKNeXv9F1rsAAAAASUVORK5CYII=
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