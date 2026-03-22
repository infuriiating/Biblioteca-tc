import { supabase } from './supabase'

// Remove VITE_RESEND_API_KEY since the Edge Function handles it securely

const baseStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; color: #18181b; line-height: 1.6; margin: 0; padding: 20px; }
  .container { max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); text-align: center; }
  .logo { width: 64px; height: 64px; margin: 0 auto 20px; }
  h1 { font-size: 24px; font-weight: 700; color: #18181b; margin-top: 0; margin-bottom: 8px; }
  p { font-size: 15px; color: #52525b; margin-bottom: 24px; }
  .btn { display: inline-block; background-color: #3b82f6; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 15px; padding: 12px 24px; border-radius: 8px; margin-bottom: 24px; transition: background-color 0.2s; }
  .btn:hover { background-color: #2563eb; }
  .footer { border-top: 1px solid #e4e4e7; padding-top: 20px; margin-top: 32px; font-size: 13px; color: #a1a1aa; text-align: center; }
  .muted { font-size: 13px; color: #71717a; }
`.replace(/\n/g, '')

const wrapEmail = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BibliotecaTC</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <img src="https://ylcoynhihpvzttnuyaft.supabase.co/storage/v1/object/public/logo/logo.png" alt="BibliotecaTC Logo" class="logo" />
    ${content}
    <div class="footer">
      BibliotecaTC &ndash; Escola Secundária Tomás Cabreira
    </div>
  </div>
</body>
</html>
`

/**
 * Sends an email via Resend and creates a notification in the database.
 * @param {string} userId - ID of the user to notify
 * @param {string} userEmail - Email address of the user
 * @param {string} type - Notification type (success, info, warning, error)
 * @param {string} subject - Email subject and Notification title
 * @param {string} message - Email body (HTML) and Notification description
 * @param {string} buttonText - Text for the CTA button (optional)
 * @param {string} buttonLink - Link for the CTA button (optional)
 */
export const notifyUser = async ({
  userId,
  userEmail,
  type = 'info',
  subject,
  message,
  buttonText,
  buttonLink
}) => {
  // 1. Insert into Supabase notifications table
  try {
    const { error } = await supabase.from('notifications').insert({
      user_id: userId,
      title: subject,
      message: message.replace(/<[^>]*>?/gm, ''), // Strip HTML for the in-app notification
      type: type
    })
    if (error) console.error('Failed to create notification:', error)
  } catch (err) {
    console.error('Notification error:', err)
  }

  // 2. Send Email via Resend
  if (!userEmail) {
    console.warn('Cannot send email: missing email address')
    return
  }

  let htmlContent = `
    <h1>${subject}</h1>
    <p>${message}</p>
  `

  if (buttonText && buttonLink) {
    htmlContent += `<a href="${buttonLink}" class="btn" style="color: #ffffff; text-decoration: none;">${buttonText}</a>`
  }

  const emailHtml = wrapEmail(htmlContent)

  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: userEmail,
        subject: subject,
        html: emailHtml
      }
    })

    if (error) {
      console.error('Edge Function error:', error)
    }
  } catch (err) {
    console.error('Failed to dispatch email via Edge Function:', err)
  }
}
