import React, {useState} from 'react';
import  { Link,  useHistory} from 'react-router-dom';
import './styles.css'
import logo from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleNewIncident(e){
    e.preventDefault();
    const data = {
      title, description, value
    }
    try {

      await api.post('incidents', data, {
        headers:{
          Authorization: ongId
        }
      })
      history.push('/profile');
    } catch (e) {
      alert("Erro ao cadastrar");
    }
  }
    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Titulo do caso"/>
                    <textarea type="email" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição"/>
                    <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Valor em reais"/>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
