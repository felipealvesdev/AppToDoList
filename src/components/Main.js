import React, { Component } from 'react';

import {FaPlus, FaEdit, FaWindowClose } from 'react-icons/fa'

import './Main.css';

export default class Main extends Component {
    state = {
        novaTarefa: '',
        tarefas: [],
    };

    handleChange = (e) =>{
        this.setState({
            novaTarefa: e.target.value,
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const { tarefas } = this.state;
        let { novaTarefa } = this.state;
        novaTarefa = novaTarefa.trim();

        if(tarefas.indexOf(novaTarefa) !== -1) return;

        const novasTarefas = [...tarefas];

        this.setState({
            tarefas: [...novasTarefas, novaTarefa],
        });
    }

    render(){
        const { novaTarefa, tarefas } = this.state;

        return (
            <div className="main">
                <h1>Lista de tarefas</h1>

                <form 
                action="#" 
                className="form"
                onSubmit={this.handleSubmit}>
                    <input 
                    onChange={this.handleChange} 
                    type="text"
                    value={novaTarefa}
                    />
                    <button type="submit">
                        <FaPlus/>
                    </button>
                </form>

                <ul className="tarefas">
                    {tarefas.map((tarefa) => (
                        <li key={tarefa}>
                            {tarefa}
                            <div>
                                <FaEdit className='edit'/>
                                <FaWindowClose className='delete'/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

}

