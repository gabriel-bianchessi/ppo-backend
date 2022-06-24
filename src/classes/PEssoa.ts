export class Pessoa {

  id?: string | undefined
  nome: string
  email: string
  senha?: string | undefined
  role?: string | undefined
  
  constructor(nome: string, email: string, senha?: string, role?: string, id?: string) {
    if(!id) {
      // generate uuid 
      this.id = '1'
    }

    if (!role) {
      this.role = "USER"
    }

    this.nome = nome
    this.email = email
    this.senha = senha
  }

}