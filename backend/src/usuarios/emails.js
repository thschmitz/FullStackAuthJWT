const nodemailer = require("nodemailer");

// Funcao de envio de emails
// Nodemailer tem um modulo para conta teste e assim nao ficar enchendo a caixa de email de alguem

class Email {
    async enviaEmail(usuario) {
        const contaTeste = await nodemailer.createTestAccount();
        const transportador = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            auth: contaTeste,
        })
        const info = await transportador.sendMail(this);
    
        console.log("URL: ", nodemailer.getTestMessageUrl(info))
    }
}

class EmailVerificacao extends Email {
    constructor(usuario, endereco) {
        super();
        this.from = '"Blog do Codigo" <noreply@blogdocodigo.com.br>';
        this.to = usuario.email;
        this.subject = "Verificação de email";
        this.text = `Ola! Verifique seu e-mail aqui: ${endereco}`;
        this.html = `<h1>Ola!</h1> Verifique seu e-mail aqui: <a href="${endereco}">${endereco}</a>`;
    }
}


module.exports = {EmailVerificacao};