const nodemailer = require("nodemailer");

// Funcao de envio de emails
// Nodemailer tem um modulo para conta teste e assim nao ficar enchendo a caixa de email de alguem

function enviaEmail(destinatario) {
    const contaTeste = await nodemailer.createTestAccount();

}