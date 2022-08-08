const nodemailer = require("nodemailer");

// Funcao de envio de emails
// Nodemailer tem um modulo para conta teste e assim nao ficar enchendo a caixa de email de alguem

function enviaEmail(destinatario) {
    const contaTeste = await nodemailer.createTestAccount();
    const transportador = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        auth: contaTeste,
    })

    transportador.sendMail({
        from: '"Blog do Codigo" noreply@blogdocodigo.com.br>'
    })
}