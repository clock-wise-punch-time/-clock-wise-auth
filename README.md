# Clock Wise

<p align="center">
  <a href="https://www.youtube.com/watch?v=J-zxT7dOIAg">
    <img src="https://img.youtube.com/vi/J-zxT7dOIAg/0.jpg" alt="Assista ao vídeo" />
  </a>
</p>

<a href="http://172.212.113.11/v1">HOST API DE AUTENTICAÇÂO ➡️ http://172.212.113.11</a><br><br>
<a href="http://172.212.113.11/v1">HOST API DE PUNCH CLOCK ➡️ http://172.212.123.219</a>

<a href="https://github.com/clock-wise-punch-time/-clock-wise-auth">➡️ SERVIÇO DE AUTENTICAÇÃO</a>

a Clock-Wise é uma ferramenta simples e eficaz para monitorar e gerenciar o tempo de trabalho dos funcionários, garantindo precisão e conformidade com as políticas da empresa e as leis trabalhistas.

### Autenticação, Segurança, Integridade dos Dados, Conformidade:

No processo de autenticação utilizamos tecnologias como:

- **reCAPTCHA**: O reCAPTCHA é uma ferramenta de segurança utilizada em sites para protegê-los contra atividades maliciosas realizadas por bots. Ele funciona apresentando desafios aos usuários, como identificar imagens específicas ou resolver quebra-cabeças, para verificar se são humanos reais e não programas automatizados. Isso ajuda a evitar a submissão automática de formulários, criação de contas falsas e outras atividades fraudulentas, mantendo a integridade e a segurança do site.

- **Fingerprint**: O Fingerprint é um método de registro de sessão que verifica a autenticidade do usuário durante o processo de registro na plataforma. Ele analisa várias informações, como o uso de uma VPN, presença de bots, localização geográfica, detalhes do dispositivo e navegador utilizados. Essas informações são úteis para identificar e bloquear atividades suspeitas, protegendo a plataforma contra fraudes e garantindo uma experiência segura para os usuários. Por meio do Fingerprint em nossa aplicação, realizamos o bloqueio de acessos identificados como "Bot" ao fazer registro na plataforma, garantindo a integridade dos dados e a segurança dos usuários.

**_Ao se registrar é obrigatório a aceitação dos termos entrando em conformidades as diretrizes da plataforma._** 

**A aplicação tem necessidade de diretrizes como:**

- **Política de Privacidade**: Política essencial para garantir que os dados pessoais dos usuários, como informações de contato e histórico de transações, sejam protegidos e tratados com cuidado. Ela estabelece como os dados são coletados, usados e protegidos, ajudando a construir confiança com os usuários e a cumprir regulamentações de privacidade.

- **Política de Proteção de Dados**: Política foca especificamente na proteção e segurança dos dados dos usuários. Ela descreve os protocolos de segurança e as medidas tomadas para evitar violações de dados, bem como os procedimentos para lidar com incidentes de segurança, garantindo que os dados dos usuários sejam mantidos em sigilo e segurança.

- **Termos de Uso**: Os termos de uso estabelecem as condições de uso do sistema de pontos. Isso inclui os direitos e responsabilidades dos usuários, limitações de responsabilidade, propriedade intelectual, políticas de reembolso e outras informações importantes que regem a relação entre a empresa e os usuários do sistema.

- **Política de Conformidade Trabalhista**: Política crucial para garantir que a empresa esteja em conformidade com todas as leis e regulamentos trabalhistas aplicáveis. Ela aborda questões como salário mínimo, horas de trabalho, segurança no local de trabalho, direitos dos trabalhadores e discriminação, ajudando a evitar litígios legais e garantindo um ambiente de trabalho justo e seguro.

- **Política de Cookies**: Política que informa aos usuários sobre o uso de cookies no seu sistema de pontos. Ela explica que tipos de cookies são usados, como são usados e como os usuários podem controlar suas preferências de cookies. Isso ajuda a garantir a transparência e conformidade com regulamentações de privacidade relacionadas ao uso de cookies.

**O sistema utiliza criptografias robustas em seus processos para garantir a segurança dos dados:**

- **JWT (JSON Web Token)**: Quando um usuário faz login, o sistema emite um token JWT, que é uma espécie de "passe de acesso" com informações sobre quem é o usuário e quais partes do sistema ele pode acessar. Este token é como um bilhete que expira em 5 minutos e é protegido por uma chave especial (RSA 2048) para que apenas o sistema possa entendê-lo.

- **Refresh Token**: Além do token JWT, o sistema também emite um "token de atualização" que dura 15 minutos. Este token não revela informações sobre o usuário, é apenas um código aleatório (como uma senha temporária) que permite ao sistema gerar novos tokens de acesso quando necessário, sem que o usuário precise fazer login novamente. 

- **Senha**: Quando um usuário cria uma senha, ela é transformada em um código irreconhecível usando um processo chamado "hashing" com um algoritmo chamado Bcrypt. Isso torna a senha segura, mesmo se alguém conseguir ver os dados do sistema, pois não será possível descobrir a senha original a partir do código armazenado.

### Disponibilidade e Escalabilidade

A aplicação foi hospedad com o  intuito de proporciona alta disponibilidade e escalabilidade seguindo as seguintes configurações:

- **Kubernetes**: O Kubernetes é uma plataforma de orquestração de contêineres que gerencia automaticamente o escalonamento, a distribuição e a operação de contêineres em um ambiente de produção. Isso garante que a aplicação esteja sempre disponível e funcione de forma confiável, mesmo em caso de falhas em um ou mais nós.

- **HPA (Horizontal Pod Autoscaler)**: O HPA é uma funcionalidade do Kubernetes que automaticamente aumenta ou diminui o número de réplicas de um aplicativo com base na carga de trabalho. Isso garante que a aplicação possa lidar com picos de tráfego sem afetar sua disponibilidade ou desempenho.

- **Nginx Ingress Controller**: O Nginx Ingress Controller é uma solução para gerenciar o tráfego de entrada para a aplicação. Ele roteia solicitações de entrada para os serviços apropriados com base em regras de roteamento configuradas. Isso ajuda a garantir o balanceamento de carga e a escalabilidade da aplicação.

- **Aplicações Dockerizadas**: As aplicações são dockerizadas, o que significa que são empacotadas em contêineres isolados, facilitando a implantação e o gerenciamento em um ambiente Kubernetes. Isso garante consistência e portabilidade, permitindo que a aplicação seja executada de forma consistente em diferentes ambientes.

Essa configuração proporciona uma infraestrutura altamente disponível, capaz de lidar com aumentos de tráfego de forma eficiente e escalável, garantindo uma experiência confiável para os usuários.

# CI/CD [Planejado / Não implementado]

O CI/CD (Integração Contínua/Entrega Contínua) planejado para nossa aplicação foi pensado para ser simples e eficaz, adaptado às necessidades específicas do nosso projeto. Seguindo o seguinte fluxo:

- **Testes Unitários**: São realizados testes automatizados para garantir que cada parte do código funcione corretamente individualmente. Isso ajuda a identificar bugs e problemas de funcionamento antes que eles cheguem aos usuários finais.

- **SAST com SonarQube Cloud**: Utilizando o SonarQube Cloud para análise estática de segurança do código-fonte. Ele identifica possíveis vulnerabilidades de segurança e problemas de qualidade de código, garantindo que nossa aplicação seja segura e robusta.

- **Docker login, build e push**: Utilizando contêineres Docker para empacotar nossa aplicação de forma consistente e portátil. Antes de implantar, realizamos o login no registro do Docker, construímos a imagem da aplicação e a enviamos para o registro, garantindo que esteja pronta para implantação.

- **Trivy Container Scanner**: Usando o Trivy para fazer a verificação de segurança das imagens de contêineres Docker, identificando possíveis vulnerabilidades e garantindo que estejam seguras antes da implantação.

- **Helm para deploy**: Usando o Helm, ferramenta que nos ajuda a gerenciar e implantar aplicativos Kubernetes de forma mais eficiente, permitindo a automação e a padronização do processo de implantação.

Esse fluxo de CI/CD faz garantir que nossa aplicação seja desenvolvida, testada e implantada de forma consistente, segura e eficiente, mantendo a qualidade e a confiabilidade do nosso produto.

# Arquitetura Robusta e Segura

Nosso código é projetado com uma arquitetura limpa, seguindo os princípios SOLID e os conceitos da arquitetura hexagonal. Isso significa que nosso código é organizado de forma modular e flexível, facilitando a manutenção e evolução ao longo do tempo.

- **Arquitetura Limpa e Princípios SOLID**: Seguimos os princípios SOLID para garantir que nosso código seja fácil de entender, modificar e estender. Isso inclui a separação de responsabilidades, a coesão dos componentes e a dependência em abstrações, promovendo um código mais robusto e sustentável.

- **Arquitetura Hexagonal**: Nossa aplicação é projetada com uma arquitetura hexagonal, também conhecida como ports and adapters. Isso significa que separamos as preocupações de negócio da implementação técnica, facilitando a substituição de componentes e a integração com diferentes tecnologias.

- **SOA (Service-Oriented Architecture)**: Optamos por uma abordagem de arquitetura orientada a serviços, onde separamos o serviço de autenticação da aplicação de Punch Clock. Isso promove a reutilização, escalabilidade e manutenibilidade do sistema, permitindo que diferentes partes da aplicação evoluam independentemente uma da outra.

- **Tratamento Avançado de Erros**: Implementamos um tratamento avançado de erros em nosso código, utilizando identificadores de códigos e suas descrições. Isso ajuda a identificar e diagnosticar problemas rapidamente, facilitando a manutenção e melhorando a experiência do usuário.

- **Medidas de Segurança**: Utilizamos medidas de segurança, como o Helmet, para proteger nossa aplicação contra diversas vulnerabilidades, como ataques de injeção de código, XSS (Cross-Site Scripting), entre outros.

- **Gracious Shutdown**: Implementamos o Gracious Shutdown para garantir que nossa aplicação encerre suas operações de forma segura e ordenada, minimizando impactos negativos para os usuários e mantendo a integridade dos dados.

Essas práticas e técnicas ajudam a garantir que nosso sistema seja robusto, seguro, fácil de manter e escalável, proporcionando uma experiência confiável para os usuários.


## Infraestrutura do Projeto
![Diagrama de Infraestrutura do Projeto de Ponto Eletrônico](https://i.imgur.com/9E9RX5i.png)

A infraestrutura do projeto é projetada para garantir escalabilidade, desempenho e segurança. A seguir, detalhamos os componentes principais da nossa infraestrutura:

- **Serviços de Computação**: Utilizamos AWS EKS para hospedar nossos serviços e aplicações, garantindo flexibilidade e escalabilidade.
- **Banco de Dados Relacional**: O RDS é utilizado para gerenciar nossas bases de dados, oferecendo backups automatizados, patching e escalabilidade.
- **Banco de Dados NoSQL**: O MongoDB é utilizado para gerenciar nossos dados não relacionais, oferecendo escalabilidade e desempenho.
- **Banco de dados Caching**: O Redis é utilizado para gerenciar nossos dados em cache, oferecendo desempenho e segurança.
- **Balanceamento de Carga**: O ELB é empregado para distribuir o tráfego de entrada dos serviços provisionados na EKS, melhorando a disponibilidade e a robustez do sistema.
- **Rede**: VPCs são configuradas para fornecer uma seção isolada da nuvem onde podemos lançar recursos da AWS em uma rede virtual que definimos.
- **Segurança**: Grupos de Segurança e IAM são usados para controlar o acesso aos recursos da AWS de forma segura.

Cada componente é cuidadosamente selecionado e configurado para atender aos requisitos de desempenho, escalabilidade e segurança do nosso sistema de ponto eletrônico.

## Diagrama de Ponto Eletrônico

![Diagrama de Arquitetura do Projeto de Ponto Eletrônico](https://i.imgur.com/K2jJe9s.png)

Esta seção descreve a arquitetura do projeto de ponto eletrônico, incluindo os componentes, serviços e tecnologias utilizadas.

### Banco de Dados e Armazenamento
Cada serviço possui seu próprio banco de dados, garantindo isolamento e facilidade de manutenção e evolução.

- **Autenticação**: O MongoDB é utilizado para gerenciamento de permissões e usuários
- **Registro de Ponto**: O PostgreSQL utilizado para gerenciamento de registros de ponto
- **Caching**: O Redis é utilizado para gerenciamento de cache
- **Relatórios**: Apesar de não possuir um banco de dados. Arquivos CSV de relatórios são gerados e enviados por e-mail

#### Diagrama do Serviço de Registro de Ponto
![Diagrama de Entidades do Projeto de Ponto Eletrônico](https://i.imgur.com/5aI35Qw.jpg)


#### Tipos de Usuários
Nosso sistema de ponto eletrônico suporta dois tipos principais de usuários: Funcionário e Administrador.

- **Funcionário**: Usuários com este perfil têm acesso às funcionalidades básicas do sistema, como registrar ponto, visualizar seus próprios registros de ponto.

- **Administrador**: Usuários com perfil de administrador possuem acesso a todas as funcionalidades do sistema, incluindo gerar relatórios de registro de pontos de funcionários.

A autenticação e autorização de usuários são fundamentais para garantir a segurança e a integridade dos dados no nosso sistema de ponto eletrônico. Por isso, adotamos as melhores práticas e tecnologias disponíveis para proteger as informações dos nossos usuários.

### Fluxo de Registro de Ponto
O fluxo de registro de ponto em nosso sistema é projetado para ser simples e eficiente, garantindo que os funcionários possam marcar seus horários de entrada e saída com facilidade. Abaixo, detalhamos o processo e algumas regras importantes:

### Registro de Entrada e Saída
- **Registro de Entrada**: Para iniciar o dia de trabalho, o funcionário deve realizar o registro de entrada através do nosso sistema. Isso pode ser feito acessando a funcionalidade de "Iniciar Ponto" na nossa aplicação, que registra automaticamente a hora atual como o horário de início do trabalho.
- **Registro de Saída**: Ao final do dia, o funcionário deve registrar a saída utilizando a funcionalidade "Encerrar Ponto". Assim como no registro de entrada, o sistema registra automaticamente a hora atual como o horário de término do trabalho.

### Consulta de Registros e Regras
Os funcionários têm a possibilidade de consultar seus registros de ponto do dia atual. Isso permite que verifiquem as horas de entrada e saída, além de quaisquer intervalos que possam ter registrado. Essa consulta pode ser realizada acessando a funcionalidade "Ponto do Dia" na nossa aplicação.

#### Regras Importantes
- **Intervalos**: Durante o dia de trabalho, os funcionários podem registrar intervalos (pausas) utilizando a funcionalidade "Iniciar Intervalo". É importante registrar o fim do intervalo através da funcionalidade "Encerrar Intervalo" para garantir a precisão do cálculo da duração total do trabalho.
- **Múltiplos Registros**: O sistema não permite múltiplos registros de entrada sem um registro de saída correspondente. Da mesma forma, não é possível registrar a saída sem ter realizado um registro de entrada no mesmo dia.

Nosso sistema foi desenvolvido com o objetivo de facilitar o processo de registro de ponto, garantindo transparência e precisão nos registros de trabalho dos funcionários. Adotamos as melhores práticas e tecnologias para assegurar a segurança e a integridade dos dados registrados.

### Funcionalidade de Relatórios CSV

A funcionalidade de geração de relatórios CSV em nosso sistema permite aos administradores extrair informações detalhadas sobre os registros de ponto dos funcionários em um formato facilmente acessível e manipulável. Esses relatórios podem incluir dados como horas trabalhadas, intervalos, e registros de entrada e saída.

Para gerar um relatório CSV, o sistema executa uma consulta ao banco de dados, filtrando os registros de ponto conforme os critérios especificados pelo administrador (Inicialmente neste MVP, apenas por período de tempo com um limite de 30 dias). Após a consulta, os dados são formatados em um arquivo CSV, que é então enviado por e-mail ao solicitante.

### Endpoints de Autenticação e Usuário

#### Registrar Novo Usuário
- **Método HTTP**: `POST`
- **Endpoint**: `/register`
- **Corpo da Requisição**: JSON com os dados para registro (exemplo: `{ "email": "email@exemplo.com", "senha": "senha123", ... }`)
- **Respostas**:
  - `200`: Usuário registrado com sucesso.
  - `400`: Dados inválidos fornecidos para registro.
  - `500`: Erro interno do servidor.

#### Login do Usuário
- **Método HTTP**: `POST`
- **Endpoint**: `/login`
- **Corpo da Requisição**: JSON com os dados de login (exemplo: `{ "email": "email@exemplo.com", "senha": "senha123" }`)
- **Respostas**:
  - `200`: Usuário logado com sucesso.
  - `400`: Credenciais inválidas fornecidas.
  - `500`: Erro interno do servidor.

#### Refresh de Tokens de Autenticação
- **Método HTTP**: `POST`
- **Endpoint**: `/refresh`
- **Corpo da Requisição**: JSON com o token de refresh (exemplo: `{ "refreshToken": "token_de_refresh" }`)
- **Respostas**:
  - `200`: Tokens atualizados com sucesso.
  - `400`: Token inválido ou dados inválidos fornecidos para atualização de token.
  - `500`: Erro interno do servidor.

#### Iniciar Processo de Redefinição de Senha
- **Método HTTP**: `POST`
- **Endpoint**: `/forgot/password`
- **Corpo da Requisição**: JSON com o email do usuário (exemplo: `{ "email": "email@exemplo.com" }`)
- **Respostas**:
  - `200`: Processo de redefinição de senha iniciado com sucesso.
  - `400`: Email inválido fornecido.
  - `500`: Erro interno do servidor.

#### Redefinir Senha do Usuário
- **Método HTTP**: `POST`
- **Endpoint**: `/reset/password`
- **Corpo da Requisição**: JSON com os dados para redefinição de senha (exemplo: `{ "token": "token_de_redefinição", "novaSenha": "senha123" }`)
- **Respostas**:
  - `200`: Senha redefinida com sucesso.
  - `400`: Dados inválidos fornecidos para redefinição de senha.
  - `500`: Erro interno do servidor.

#### Confirmar Email do Usuário
- **Método HTTP**: `POST`
- **Endpoint**: `/confirm/email`
- **Corpo da Requisição**: JSON com os dados para confirmação de email (exemplo: `{ "token": "token_de_confirmação" }`)
- **Respostas**:
  - `200`: Email confirmado com sucesso.
  - `400`: Dados de confirmação inválidos fornecidos.
  - `500`: Erro interno do servidor.

#### Solicitar Redefinição de Email
- **Método HTTP**: `POST`
- **Endpoint**: `/request/reset/email`
- **Respostas**:
  - `200`: Solicitação de redefinição de email bem-sucedida.
  - `400`: Dados inválidos fornecidos para solicitação de redefinição de email.
  - `500`: Erro interno do servidor.

#### Redefinir Email do Usuário
- **Método HTTP**: `POST`
- **Endpoint**: `/reset/email`
- **Corpo da Requisição**: JSON com os dados para redefinição de email (exemplo: `{ "token": "token_de_redefinição", "novoEmail": "email@exemplo.com" }`)
- **Respostas**:
  - `200`: Email redefinido com sucesso.
  - `400`: Dados inválidos fornecidos para redefinição de email.
  - `500`: Erro interno do servidor.


### Endpoints da Aplicação de Registro de Ponto

Nossa aplicação possui diversos endpoints que permitem a interação com o sistema de ponto eletrônico. Abaixo, detalhamos os endpoints disponíveis e suas respectivas funcionalidades.

#### Endpoints de Intervalo (Break)

- **Iniciar Intervalo**: Permite ao funcionário iniciar um intervalo (pausa).
  - Método HTTP: `POST`
  - Endpoint: `/break/start`
  - Corpo da Requisição: `{ "userId": "id_do_usuario" }`

- **Encerrar Intervalo**: Permite ao funcionário encerrar um intervalo previamente iniciado.
  - Método HTTP: `POST`
  - Endpoint: `/break/end`
  - Corpo da Requisição: `{ "userId": "id_do_usuario" }`

#### Endpoints de Registro de Ponto (Punch Clock)

- **Registrar Entrada**: Permite ao funcionário registrar o início do seu dia de trabalho.
  - Método HTTP: `POST`
  - Endpoint: `/punch-clock/start`
  - Corpo da Requisição: `{ "userId": "id_do_usuario" }`

- **Registrar Saída**: Permite ao funcionário registrar o término do seu dia de trabalho.
  - Método HTTP: `POST`
  - Endpoint: `/punch-clock/end`
  - Corpo da Requisição: `{ "userId": "id_do_usuario" }`

- **Consultar Ponto do Dia**: Permite ao funcionário consultar os registros de ponto do dia atual.
  - Método HTTP: `GET`
  - Endpoint: `/punch-clock/today?userId=id_do_usuario`

### Códigos de erros

| Código de Erro | Descrição                                           |
|----------------|-----------------------------------------------------|
| 1000           | Erro interno do sistema                             |
| 1001           | Falha ao conectar ao banco de dados                 |
| 1002           | Falha na conexão com o banco de dados               |
| 1003           | Não foi possível ler dados do banco de dados        |
| 1004           | Não foi possível gravar dados no banco de dados     |
| 1005           | Não foi possível atualizar dados no banco de dados  |
| 1006           | Não foi possível excluir dados do banco de dados    |
| 1007           | Falha na execução da transação no banco de dados    |
| 1008           | Erro de sintaxe durante a execução da consulta no banco de dados |
| 1009           | Limite de conexões simultâneas ao banco de dados excedido |
| 1010           | Tempo limite excedido durante a espera por uma resposta do banco de dados |
| 1011           | Conflito de dados detectado ao tentar modificar dados no banco de dados |
| 1012           | Não foi possível ler o arquivo especificado         |
| 1013           | Não foi possível escrever no arquivo especificado   |
| 1014           | Memória insuficiente para concluir a operação      |
| 1015           | Problema de rede detectado                          |
| 1016           | Permissões insuficientes para acessar o recurso    |
| 1017           | Configuração inválida ou ausente                   |
| 1018           | O recurso solicitado não foi encontrado            |
| 1019           | O serviço necessário está temporariamente indisponível |
| 1020           | Falha na autenticação do usuário                   |
| 1021           | O usuário não tem permissão para acessar o recurso  |
| 1022           | Os dados fornecidos não são válidos                |
| 1023           | Falha no processamento dos dados                   |
| 1024           | Não foi possível enviar o e-mail                    |
| 1025           | Falha ao decodificar os dados                      |
| 1026           | Falha ao codificar os dados                        |
| 1027           | Foi fornecido um parâmetro inválido               |
| 1028           | Uma dependência necessária está ausente            |
| 1029           | Tempo limite excedido durante a operação           |
| 2001           | Erro ao utilizar cliente para operações de banco de dados Prisma |
| 2002           | Falha na conexão com o banco de dados MongoDB       |
| 2003           | Erro ao executar uma consulta no banco de dados MongoDB |
| 3001           | Nome de usuário já existente                        |
| 3002           | Número de registro já existe                        |
| 3003           | CPF já existe                                      |
| 3004           | E-mail já existe                                   |
| 3005           | Formato de data de nascimento inválido              |
| 3006           | Função de usuário inválida                         |
| 3007           | Usuário não encontrado                             |
| 3008           | Falha ao atualizar o status do usuário             |
| 3009           | Falha ao excluir usuário                           |
| 3010           | Usuário ou senha incorretos                        |
| 3011           | CPF inválido                                       |
| 3012           | Telefone inválido                                  |
| 4000           | Você só pode se registrar se concordar com as diretrizes |
| 4001           | Diretriz não encontrada                            |
| 4002           | Tipo de diretriz inválido                          |
| 4003           | Falha ao atualizar o status da diretriz            |
| 4004           | Falha ao excluir a diretriz                        |
| 5001           | Falha ao aceitar a diretriz                        |
| 5002           | Falha na rejeição da aceitação da diretriz         |
| 5003           | Falha ao atualizar o status da aceitação da diretriz |
| 5004           | Falha ao excluir a aceitação da diretriz           |
| 6001           | Dispositivo não encontrado                        |
| 6002           | Falha ao criar dispositivo                         |
| 6003           | Falha ao atualizar dispositivo                     |
| 6004           | Falha ao excluir dispositivo                       |
| 7001           | Código de verificação não encontrado               |
| 7002           | Tipo de código de verificação inválido             |
| 7003           | Falha ao gerar código de verificação               |
| 7004           | Falha ao validar código de verificação             |
| 7005           | Falha ao atualizar status do código de verificação |
| 7006           | Falha ao excluir código de verificação             |
| 8001           | Falha na verificação de impressão digital          |
| 8002           | Falha na verificação do reCAPTCHA                  |
| 8003           | Falha na criptografia RSA                          |
| 8004           | Falha ao criar hash com Bcrypt                     |
| 8005           | Falha ao enviar e-mail                              |
| 9001           | Acesso bloqueado temporariamente                   |
| 9003           | Você não tem permissão para acessar este recurso   |

### Documentação Swagger

Para facilitar a compreensão e o uso dos endpoints da nossa aplicação, disponibilizamos uma documentação Swagger. Através dela, é possível testar todos os endpoints disponíveis de forma prática, visualizar os parâmetros necessários para cada requisição e as respostas esperadas.

Para acessar a documentação Swagger da nossa aplicação, utilize o seguinte endereço no seu navegador:

- **URL da Documentação Swagger **: `url_da_api/v1/doc`
