# MobCar
* teste desenvolvido para processo seletivo na empresa Moblize

## Como executar o teste Back-end
* Utilizar o sistema operacional Windows
* Instalar o NodeJS, Yarn e Npm em seu computador
* Instalar o MongoDB, junto com a interface Compass,  em seu computador
* Instalar o Insomnia em seu computador
* Iniciar o MongoDB junto a um servidor local
* Abrir o prompt de comando de sua IDE e digitar: yarn add mongoose , para iniciar a base de dados
* Configurar os dados do banco através do arquivo index.js da pasta database
* Ao executar o sistema pela primeira vez, criar um modelo e um carro, este utilizando o id do modelo no campo "modelo", utilizando o Insomnia, pois não foi criado um seed
* Para testar as rotas, utilizar o Insomnia
* Ao listar os carros, inserir na url a ordenação (ord=placa, por exemplo) e o filtro (cor=azul, por exemplo)


## O que aprendi com o teste:
* Trabalhar com MongoDB utilizando o mongoose 
* Trabalhar melhor com rotas utilizando o nodeJS associado ao mongoose, visto que foi minha primeira experiência utilizando ambos em um mesmo projeto
* Trabalhar com paginação


## O que não houve tempo para aprimorar:
* A função paginate associada a filtros: saber programá-la de forma que tanto quando os filtros e ordenações estiverem ausentes na url, quanto quando estiverem presentes, seja possível utilizála (o modo como programei permite seu uso apenas na presença de filtro e ordenação) 
