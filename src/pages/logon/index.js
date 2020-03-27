import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import api  from   '../../services/api';

import './styles.css';
import heroImg  from '../../assets/heroes.png';
import logoImg  from '../../assets/logo.svg';

export default function Logon() {

    // pegando o id do campo 
    const [id, setId] = useState('');

    // variável de navegação
    const history = useHistory();

    // função de login
    async function handleLogin(e) {

        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});
            
            localStorage.setItem('ongId', id); // armazenando o Id no localStorage
            localStorage.setItem('ongName', response.data.name); // aramazenando o nome da ong no localstorage

            // redirecionando para página perfil
            history.push('/profile');

        } catch (err) {
            alert('Falha no Login');
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Heroes"/>
                <form  onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>

                    <button type="submit" className="button">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroImg} alt="Heroes"/>
        </div>
    );
}