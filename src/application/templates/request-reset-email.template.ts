export function requestResetEmailTemplate(name: string, link: string) {
  return `<body>
          <div class="container">
              <h1>Olá ${name}, solicitamos uma redefinição de senha para sua conta na plataforma Clock-Wise!</h1>
              <p>Para continuar com a redefinição da senha, clique no link abaixo:</p>
              <p><a href="${link}">Redefinir Senha</a></p>
              <p>Se você não solicitou a redefinição de senha, pode ignorar este e-mail.</p>
              <p>Se precisar de ajuda, entre em contato conosco.</p>
              <p>Atenciosamente,<br>Equipe Clock-Wise</p>
          </div>
      </body>`;
}
