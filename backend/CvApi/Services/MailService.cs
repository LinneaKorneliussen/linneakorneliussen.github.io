using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

public class MailService
{
        private readonly string _smtpHost;
        private readonly int _smtpPort;
        private readonly string _smtpUser;
        private readonly string _smtpPass;

        public MailService(string smtpHost, int smtpPort, string smtpUser, string smtpPass)
        {
            _smtpHost = smtpHost;
            _smtpPort = smtpPort;
            _smtpUser = smtpUser;
            _smtpPass = smtpPass;
        }

        public async Task<bool> SendEmailAsync(string fromEmail, string fromName, string subject, string message)
        {
            try
            {
                var mail = new MailMessage();
                mail.From = new MailAddress(fromEmail, fromName);
                mail.To.Add("linneakorneliussen@hotmail.com");
                mail.Subject = subject;
                mail.Body = message;
                mail.IsBodyHtml = false;

                using (var smtp = new SmtpClient(_smtpHost, _smtpPort))
                {
                    smtp.Credentials = new NetworkCredential(_smtpUser, _smtpPass);
                    smtp.EnableSsl = true;
                    await smtp.SendMailAsync(mail);
                }

                return true;
            }
            catch
            {
                return false;
            }
        }
}
    