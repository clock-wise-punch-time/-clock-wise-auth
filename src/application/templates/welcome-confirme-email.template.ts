export function welcomeConfirmEmailTemplate(name: string, link: string) {
  return `<body>
        <div class="container">
            <h1>Olá ${name}, seja bem-vindo(a) à plataforma Clock-Wise!</h1>
            <p>Estamos empolgados em tê-lo conosco para explorar todo o potencial do Push Time. Para começar, por favor, confirme seu e-mail para garantir que tenhamos a maneira mais eficiente de nos comunicarmos com você.</p>
            <p>Clique no link abaixo para confirmar seu e-mail e começar a sua jornada com a Clock-Wise:</p>
            <p><a href="${link}">Confirmar E-mail</a></p>
            <p>Após a confirmação, você terá acesso total às nossas funcionalidades e recursos exclusivos para otimizar o seu tempo.</p>
            <p>Estamos ansiosos para ver como você aproveitará ao máximo o tempo com a Clock-Wise!</p>
            <p>Atenciosamente,<br>Equipe Clock-Wise</p>
        </div>
    </body>`;
}
