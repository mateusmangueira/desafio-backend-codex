import { Router } from 'express'; //Router serve para rotear por via do Express qual rota sera chamada, assim facilitando a nossa vida.

const routes = new Router(); // Criando o roteador e associando a uma constante para manipular

//Criar rotas POST,GET,PUT ou DELETE a partir daqui. de acordo com o que precisa na aplicacao. Vou deixar 1 rota GET para testar o Server

routes.get('/tasks', (req, res) => {
  return res.json(req.body);
}) //Depois vamos refatorar essas rotas utilizando Controllers. Cada classe do Sitema tem um Model e um Controller. Model serve para criar a classe basica de representacao da abstracao no sistema e ser persistida no BD e o Controller para fazer a logica de negocio desse Model na aplicacao.

export default routes;