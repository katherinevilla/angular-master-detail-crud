import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api'


export class InMemoryDataBase implements InMemoryDbService{

  createDb(){
    const categories = [
      {id:1, name: 'Moradia', description: 'Pagamento de conta de casa'}
      {id:2, name: 'Saude', description: 'Plano de Saude e Remedios'},
      {id:3, name: 'Lazer', description: 'Cinema, parques, praia,etc'},
      {id:4, name: 'Salario', description: 'Recibimento de Salario'},
      {id:5, name: 'Freelas', description: 'Trabalhos como freelancer'}
    ]
    return {categories}
  }
}