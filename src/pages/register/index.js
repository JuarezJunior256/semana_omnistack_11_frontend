import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'

import { FiLogIn } from 'react-icons/fi'

import './styles.css'

export default function Register() {
    // estados para armazenar valores dos campos
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    // função para cadastrar uma ong
    async function handleRegister(e) {
        
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        }catch(err) {
            alert('Erro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src="" alt="" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, ajude Ongs.</p>

                    <Link className="back-link" to="/">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}> 
                    <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWatsapp(e.target.value)}  />
                    
                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" value={uf} onChange={e => setUf(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}