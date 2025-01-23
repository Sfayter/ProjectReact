import React, { useState } from 'react';
import "./index.scss"
import axios from "axios"

export default function App() {
  const [cep, setCep] = useState('');
  const [ativo, setAtivo] = useState()
  const [retorno, setRetorno] = useState([]);
  const [retornoFilme, setRetornoFilme] = useState([]);
  const [retornoAtivos, setRetornoAtivos] = useState([]);

  //variáveis de estado para postar filmes
  const [nome, setNome] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [avaliacao, setAvaliacao] = useState();
  const [dataLancamento, setDataLancamento] = useState('');
  const [ativos, setAtivos] = useState();
  const [respostaFilme, setRespostaFilme] = useState([]);

  const filmeDados = {
    'nome': nome,
    'sinopse': sinopse,
    'avaliacao': Number(avaliacao),
    'dataLancamento': dataLancamento,
    'disponivel': ativos
  }

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

      setRetornoAtivos(dados);
  }

  

  async function post(){
    
    let url = `
    http://localhost:3307/filme
    `
    alert(filmeDados.dataLancamento)

    try{
      let requisicao = await axios.post(url, filmeDados);

    let dados = requisicao.data;

    

    setRespostaFilme(dados);
    }catch(err){
      console.log(err);
    }
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
              <hr/>
            <div className='inserirFilme'>
              <div className='inserirCampos'>
                <input type='text' placeholder='Insira o nome do filme' value={nome} onChange={e => setNome(e.target.value)}></input>
                <input type='text' placeholder='Insira a sinopse do filme' value={sinopse} onChange={e => setSinopse(e.target.value)}></input>
                <input type='number' placeholder='Insira uma avaliação' value={avaliacao} onChange={e => setAvaliacao(e.target.value)}></input>

                <input type='date' id='dataLancamento' value={dataLancamento} onChange={e => setDataLancamento(e.target.value)}></input>
                
              
                  
                

                  <div className='radioOptions'>
                    <div className='radioOption1'>
                      <input type='radio' id='opcao1' name='opcoes1' value={ativos} onClick={() => setAtivos(1)}></input>
                      <label for='opcao1'>Ativos</label>
                    </div>
                    <div className='radioOption2'>
                      <input type='radio' id='opcao2' name='opcoes2' value={ativos} onChange={() => setAtivos(0)}></input>
                      <label for='opcao2'>Inativos</label>
                    </div>
                  </div>
                <button onClick={post}>Enviar</button>

                <div className='resposta'>
                {respostaFilme.map((index, filme) => (
                  <p key={index}>{filme.id}</p>
                ))}
                </div>
              </div>
            </div>

            <div>
              {ativos.map((index, filme) (
                <p key={index}> {filme.ativos} <br/> {filme.dados}</p>

                
              ))}

              <div>
                <input type='text' value={ativo} onChange={e => setAtivo(e.target.value)}></input>
              </div>
            </div>
    </div>
  );
}

