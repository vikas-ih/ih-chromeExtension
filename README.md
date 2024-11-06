**In your Frontegg portal:**
go to Env settings -> Domains -> Allowed Origins then add your extension's origin as following:

chrome-extension://[Your-Extension-ID]
You can find your extension id in chrome://extensions/ under your uploaded extension

![image](https://github.com/user-attachments/assets/06aeca27-7afe-432f-b385-ee106695717b)


**Update Content Security Policy in manifest.json
**To enable the correct permissions for your Chrome extension, update the content_security_policy in the manifest.json file as follows:

"content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'; connect-src https://app-dur7z3jxz6xz.us.frontegg.com chrome-extension://[Your-Extension-ID]"
},
Make sure to replace [Your-Extension-ID] with your actual Chrome extension ID.


