import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Moment from 'moment';

const Table = styled.table `
    margin:auto;
    overflow-x: scroll;

    thead td {
        font-weight: bold;
        background-color: #555;
    }

    tr:nth-child(even) {
        background-color: #ddd;
        cursor: pointer;
    }

    tr:nth-child(odd) {
        background-color: #aaa;
        cursor: pointer;
    }

    td {
        padding: 5px 15px 5px 15px;
    }
`;

const TdDescription = styled.td `
    min-width: 200px;
`;

const url = "https://api.github.com/users/";

const Container = styled.div `
    overflow: scroll;
    margin-top: 10px;
    margin-bottom: 10px;
    box-shadow: gray 3px 3px 4px;
`;

interface IRepo {
    name?: string;
}

const Repo: React.FC<IRepo> = ({name}) => {
    const [thisRepoName] = useState(name);
    const [repoStruct,setRepoStruct] = useState([]);
    useEffect(()=>{
        fetch(url + thisRepoName + '/repos' ).then(resp=>resp.json()).then(result=>{
            console.log(result);
            setRepoStruct(result);
        });
        
        
    },[thisRepoName]);

    
    
    return(<Container>{console.log(repoStruct)}
    
        <Table>
            <thead>
                <tr>
                    <td>Nome</td>
                    <td>ID</td>
                    <TdDescription>Descrição</TdDescription>
                    <td>Data de Criação</td>
                    <td>Data de Atualização</td>
                </tr>
            </thead>
            <tbody>
                
            
        
        {repoStruct.map((item:any)=>{
            return (
                
                    <tr onClick={() => window.open(item.html_url)}>
                        <td>{item.name}</td>
                        <td>{item.id}</td>
                        <TdDescription>{item.description ? item.description : '[Sem Descrição]'}</TdDescription>
                        <td>{Moment(item.created_at).format('DD/MM/yyyy')}</td>
                        <td>{Moment(item.updated_at).format('DD/MM/yyyy')}</td>
                    </tr>
            );
        })}
        </tbody>
        </Table>
    </Container>);
}

export default Repo;