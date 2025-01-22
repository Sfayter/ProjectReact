import React, { useState } from 'react';
import "./index.scss"
import axios from "axios"

export default function App() {
  const [cep, setCep] = useState('');
  const [ativo, setAtivo] = useState()
  const [retorno, setRetorno] = useState([]);
  const [retornoFilme, setRetornoFilme] = useState([]);
  const [retornoAtivos, setRetornoAtivos] = useState([]);

  async function buscarCep(){

    let url = 'http://viacep.com.br/ws/' + cep + '/json/';
    
      let requisicao = await axios.get(url);

      let dados =  requisicao.data;

      let mensagem = dados.cep + ' ' + dados.bairro + ' ' + dados.estado;
      
      setRetorno(mensagem)
  }

  async function listarFilmes(){
    let comando = 'http://localhost:3307/filme'

    let requisicao = await axios.get(comando);

    let dados = requisicao.data;

    setRetornoFilme(dados);
  }

  async function listarAtivos(){
    let comando = `
      http://localhost:3307/filme/ativos?ativos=` + ativo


      let requisicao = await axios.get(comando)

      let dados = requisicao.data

      setRetornoAtivos(dados.consulta);
  }
    
  return (
    <div className='App'>
        <header>
            <h1>Jornada React</h1>
        </header>
        <section>
          <input type='text' placeholder='Digite o CEP' value={cep} onChange={e => setCep(e.target.value)}/>
          <button onClick={buscarCep}>Clique em mim</button>
        </section>

        <div className='respostaCEP'>
          <p>{retorno}</p>
        </div>

        <hr></hr>

        <header>
          <h1>Jornada React Filmes</h1>
        </header>
        <div className='corpoFilme'>
          <button onClick={listarFilmes}>Listar Filmes</button>
        </div>

        <div className='respostaFilme'>
          {retornoFilme.map((filme, index) => (
            <p key={index}>{filme.nome} <br/> {filme.sinopse}</p>
          ))}
        </div>

          <hr/>

        <div className='buscarAtivos'>
          <input type='text' placeholder='Insira 1 ou 0' value={ativo} onChange={e => setAtivo(e.target.value)}></input>
          
          <button onClick={listarAtivos}>Listar Ativos</button>
        </div>

            <div className='respostaAtivos'>
              {retornoAtivos.map((filme, index) => (
                <p key={index}>{filme.nome} <br/> {filme.sinopse}</p>
              ))}
            </div>
    </div>
  );
}

