import React, {useState,useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api  from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';


export default function Profile() {

    const history = useHistory();

    // estado que armazena dados dos casos da ong 
    const [incidents, setIncidents] = useState([]);
    
    const ongId = localStorage.getItem('ongId'); // pegando id da ong
    const ongName = localStorage.getItem('ongName'); // pegando nome da ong

    useEffect(() => {
        api.get('profile', {
          headers: {
              Authorization: ongId,
          }  
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    // função para deletar um caso
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            //irá renderizar todos casos diferente do id passado na função
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {

        }
    }

    // função para logout
    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO: </strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO: </strong>
                            <p>{incident.value}</p>

                            <strong>VALOR: </strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                <FiTrash2 size={20} color="a8a8b3" />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}