interface TemplateParams {
    name: string;
    url: string;
}

const verifyEmailTemplate = ({ name, url}: TemplateParams) => {
    return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; max-width: 600px; margin: auto;">
    <h2 style="color: #ff7f00; text-align: center;">Welcome to Binkeyit, ${name}!</h2>
    <p style="font-size: 16px;">Thank you for registering with us. To complete your registration, please verify your email by clicking the button below:</p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="${url}" style="text-decoration: none; color: white; background-color: #ff7f00; padding: 12px 20px; border-radius: 5px; font-size: 16px; display: inline-block; font-weight: bold;">
        Verify Email
      </a>
    </div>
    <p style="font-size: 14px; margin-top: 30px; color: #666;">
      If you did not register with Binkeyit, please ignore this email or contact our support team.
    </p>
    <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #aaa;">
      © 2024 Binkeyit. All rights reserved.
    </footer>
  </div>
  `;
  };
  

export default verifyEmailTemplate