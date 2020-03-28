import React, {useState} from 'react';
import  { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import './styles.css'
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Logon(){
  const [id, seId] = useState('');
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();
    try{
      const response = await api.post('sessions', {id});
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.nome);
      history.push('/profile');
    }catch(err){
      alert("Falhano login");
    }
  }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua iD" value={id} onChange={e => seId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="heroes"></img>
        </div>
    );
}
