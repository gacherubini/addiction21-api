class ContatoController {
    constructor(EmailService) {
        this.EmailService = EmailService;
    }

    async SendEmail(req, res) {
        const { user_name, user_email, message } = req.body;

        try {
            await this.EmailService.sendEmail({
                from: user_email,
                to: process.env.EMAIL,
                subject: `Mensagem de Contato de ${user_name}`,
                text: message,
                html: `<p>Você recebeu uma nova mensagem de <strong>${user_name}</strong> (${user_email})</p>
                       <p><strong>Mensagem:</strong></p>
                       <p>${message}</p>`
            });

            res.status(200).json({ message: 'Email enviado com sucesso!' });
        } catch (error) {
            console.error('Erro ao enviar o email:', error);
            res.status(500).json({ error: 'Erro ao enviar o email' });
        }
    }
}

module.exports = ContatoController;
