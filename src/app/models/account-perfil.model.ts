export class PerfilAcesso {
    id: number = undefined as unknown as number;
    perfil: string = '';
}

export enum Role {
    Admin = 1,
    Master = 2,
    Backoffice = 3,
}
/*

Todos
    - Alterar dados da própria conta como nome, telefone e senha (exceto o email, certo?)

Admin 
    - CRUD empresas
        E isso está incluso:
        - CRUD Produto
        - CRUD Setup
        - CRUD Cliente
        - CRUD Usuario
        - CRUD Percentual Risco
        
Master
    - Acesso ao Minhas empresas
    - CRUD Produto da respectiva empresa
    - CRUD Setup da respectiva empresa
    - CRUD Cliente da respectiva empresa
    - CRUD Usuario da respectiva empresa
    - CRUD Percentual Risco da respectiva empresa
    - CRUD de planner da respectiva empresa
    
Backoffice
    - Acesso ao Minhas empresas
    - CRUD do planner que cadastrou 

*/