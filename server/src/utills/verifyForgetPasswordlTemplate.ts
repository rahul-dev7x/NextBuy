interface TemplateParams {
    name: string;
    otp: number;
}

const verifyForgetPasswordTemplate = ({ name, otp }: TemplateParams): string => {
    return `
     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; max-width: 600px; margin: auto;">
    <h2 style="color: #ff7f00; text-align: center;">Reset Your Password, ${name}!</h2>
    <p style="font-size: 16px;">We received a request to reset your password. Use the OTP below to reset your password:</p>
    <div style="text-align: center; margin-top: 20px;">
      <p style="font-size: 24px; color: #ff7f00; font-weight: bold;">${otp}</p>
    </div>
    <p style="font-size: 14px; margin-top: 30px; color: #666;">
      If you did not request a password reset, please ignore this email or contact our support team immediately.
    </p>
    <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #aaa;">
      © 2024 Binkeyit. All rights reserved.
    </footer>
  </div>
    `;
};

export default verifyForgetPasswordTemplate;
  