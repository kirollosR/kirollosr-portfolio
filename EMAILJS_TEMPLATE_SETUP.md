# EmailJS Template Setup Guide

## Steps to Create Your EmailJS Template

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click **"Email Templates"** in the sidebar
3. Click **"Create New Template"**
4. Set the **Template Name** to something like `portfolio_contact`
5. Copy and paste the HTML below into the **Content** tab
6. Set the **Subject** field to: `New Portfolio Message: {{subject}}`
7. Set **To Email** to your email (kirollosrafik93@gmail.com)
8. Click **Save**
9. Copy the **Template ID** (e.g., `template_xxxxxx`) from the template settings
10. Update `portfolioData.js` → `emailjs.templateId` with your Template ID

---

## Template HTML (paste into EmailJS Content tab)

```html
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a1929; border: 1px solid #1e3a5f; border-radius: 12px; overflow: hidden;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #ed5f1e, #febf00); padding: 24px 32px;">
    <h1 style="color: #0a1929; margin: 0; font-size: 22px; font-weight: 700;">
      📬 New Message from Portfolio
    </h1>
  </div>
  
  <!-- Body -->
  <div style="padding: 32px;">
    
    <div style="margin-bottom: 24px;">
      <p style="color: #8899a6; font-size: 13px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">From</p>
      <p style="color: #e2e8f0; font-size: 16px; margin: 0; font-weight: 600;">{{from_name}}</p>
      <p style="color: #0167a4; font-size: 14px; margin: 4px 0 0 0;">
        <a href="mailto:{{from_email}}" style="color: #0167a4; text-decoration: none;">{{from_email}}</a>
      </p>
    </div>
    
    <div style="margin-bottom: 24px;">
      <p style="color: #8899a6; font-size: 13px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
      <p style="color: #febf00; font-size: 16px; margin: 0; font-weight: 600;">{{subject}}</p>
    </div>
    
    <div style="border-top: 1px solid #1e3a5f; padding-top: 24px;">
      <p style="color: #8899a6; font-size: 13px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Message</p>
      <div style="background: #132f4c; border: 1px solid #1e3a5f; border-radius: 8px; padding: 20px;">
        <p style="color: #e2e8f0; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">{{message}}</p>
      </div>
    </div>
    
  </div>
  
  <!-- Footer -->
  <div style="background: #132f4c; padding: 16px 32px; border-top: 1px solid #1e3a5f;">
    <p style="color: #8899a6; font-size: 12px; margin: 0; text-align: center;">
      Sent via <span style="color: #ed5f1e; font-weight: 600;">Kirollos Rafik</span>'s Portfolio Contact Form
    </p>
  </div>
  
</div>
```

## Template Variables Used

Your Contact form sends these variables — make sure they match your template:

| Variable       | Description                |
|---------------|----------------------------|
| `{{from_name}}` | Sender's name             |
| `{{from_email}}`| Sender's email            |
| `{{subject}}`   | Message subject           |
| `{{message}}`   | Message body              |
| `{{to_name}}`   | Your name (Kirollos)      |

## Auto-Reply (Optional)

In EmailJS, you can also set up an **auto-reply** to the sender:
1. Go to your template settings
2. Enable "Auto-Reply"
3. Set **Reply To** field to `{{from_email}}`
4. Use `{{to_name}}` in the auto-reply body

## After Setup

Update the template ID in `src/data/portfolioData.js`:

```js
emailjs: {
    serviceId: 'service_ca7tmjb',
    templateId: 'template_XXXXXX',  // ← Replace with your actual Template ID
    publicKey: 'ITiXWTeFkGWsWcqwL',
},
```
