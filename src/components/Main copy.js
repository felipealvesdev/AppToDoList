import React, { Component } from 'react';

import {FaPlus, FaEdit, FaWindowClose } from 'react-icons/fa'

import './Main.css';

export default class Main2 extends Component {
    state = {
        novaTarefa: '',
        tarefas: [],
        index: -1,
    };

    componentDidMount(){
        const tarefas = JSON.parse(localStorage.getItem("tarefas"));

        if(!tarefas) return;

        this.setState({
            tarefas
        });

    }

    componentDidUpdate(prevProps, prevState){
        const { tarefas } = this.state;

        if (tarefas === prevState.tarefas) return;

        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    handleChange = (e) =>{
        this.setState({
            novaTarefa: e.target.value,
        });
    }
/*A resposta curta: o -1 significa não encontrado
A resposta mais longa: 
o método indexOf faz uma busca dentro da lista de tarefas 
a fim de encontrar alguma tarefa com o mesmo texto da tarefa que deseja ser adicionada
pela regra que foi imposta, caso esta nova tarefa já exista dentro da lista de tarefas atual, ela não pode ser adicionada 
(não pode ter tarefas duplicadas)
como o indexOf retorna -1 se não foi encontrado um valor, o if verifica se o resultado não é -1 para bloquear a inserção (o return)
*/
    handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Submit clicado");
        
        const { tarefas, index } = this.state;
        let { novaTarefa } = this.state;
        novaTarefa = novaTarefa.trim();

        if(tarefas.indexOf(novaTarefa) !== -1) return;
//BASICAMENTE, EXISTE DENTRO DO ARRAY, DA LISTA TAREFAS, ALGO IGUAL A STRING NOVATAREFA? SE NAO EXISTIR
//ELE RETORNA -1, SIGNIFICA QUE NAO FOI ENCONTRADO ALGO IGUAL
// AI FAZ -1 É DIFERENTE DE -1? NÃO! ENTAO DÁ VERDADEIRO O IF E RETORNA.
        const novasTarefas = [...tarefas];

        if (index === -1){
            this.setState({
                tarefas: [...novasTarefas, novaTarefa],
                novaTarefa: "",
            });
        }else{
            novasTarefas[index] = novaTarefa;

            this.setState({
                tarefas: [...novasTarefas],
                index: -1,
                novaTarefa:"",
            });
        }
        
    }

    handleDelete = (e,index) =>{
        const { tarefas } = this.state;
        const novasTarefas = [...tarefas];
// .splice(no indice tal, remova tantos elementos)
        novasTarefas.splice(index,1);

        this.setState({
            tarefas: [...novasTarefas],
        })
    }

    handleEdit = (e,index)=>{
        const { tarefas } = this.state;

        this.setState({
            index,
            novaTarefa: tarefas[index],
        })

    }

    render() {
        // PARA DECLARAR AS VARIAVEIS DENTRO DE RENDER, PRECISA SER FORA DO RETURN
        const { novaTarefa, tarefas } = this.state;

        // PRECISA SER IGUAL AO DO STATE LÁ EM CIMA, PORQUE É FAZ UM DESTRUCTURING
        //NAO PODE MUDAR O VALOR DAS CHAVES
        //PRECISAM SER IDENTICAS PARA FUNCIONAR

        return(
            //Agora, para pegar o valor do novo novaTarefa, basta chamar uma variável que pegue esse valor
            <div className="main">
                <h1> Bloco de notas</h1>
                
                <form action='#' 
                    className="form"
                    onSubmit={this.handleSubmit}
                >
                    <input 
                        type="text" 
                        onChange={this.handleChange} 
                        value={novaTarefa}
                    />

                    <button type="submit">
                        <FaPlus />
                    </button>
                </form>
                <ul className="tarefas">
                    {tarefas.map((tarefa, index) =>(
                        <li key={tarefa}>
                            {tarefa}
                            <div>
                                <FaEdit 
                                    className='edit'
                                    onClick={(e)=> this.handleEdit(e,index)}
                                />
                                <FaWindowClose 
                                    className='delete'
                                    onClick={(e)=> this.handleDelete(e,index)}    
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

