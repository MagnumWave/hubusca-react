import React ,  {useEffect, useState} from 'react';
import styled from 'styled-components';
import Repo from './Repo';

const Img = styled.img `
    border-radius: 50%;
    box-shadow: 2px 2px 3px;
    cursor: pointer;
    width: 100%;
    resize: both;
`;

const ImgContainer = styled.div `
    width: 150px;
    height: 150px;
    margin: auto;
`;

const Container = styled.div `
    margin-top: 10px;
    padding-bottom: 15px;
    padding-left: 10px;
    padding-right: 10px;
`;

const UserContainer = styled.div `
    border: rgb(0,0,0,0.2) 1px solid;
    box-shadow: gray 3px 3px 4px;
    margin-top: 10px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    @media (min-width: 768px){
        display:flex;
        flex-direction: row;
    }
`;

const TextContainer = styled.div `
    padding: 5px;
    @media (min-width: 320px){

    }

    @media (min-width: 768px){
        text-align: right;
        margin-left: auto;
    }
`;

const url = "https://api.github.com/users/";
interface IUser {
    user?: string
}

const User: React.FC<IUser> = ({user}) => {
    const [userName] = useState(user);
    const [myResp,setMyResp] = useState({
        name: '',
        login: '',
        description: '',
        id: '',
        followers: '',
        avatar_url: '',
        repos_url: ''
    });
    const[showRepo,setShowRepo] = useState(false);
    const[showUser,setShowUser] = useState(false);

    useEffect(()=>{
        fetch(url + userName).then(resp => resp.json()).then(result => {console.log(result);
            result.message==="Not Found" ? setShowUser(false) : setShowUser(true);
            setMyResp({
            name: result.name,
            login: result.login,
            description: result.description,
            id: result.id,
            followers: result.followers,
            avatar_url: result.avatar_url,
            repos_url: result.repos_url

        })});
        
    },[userName]);
 return (
    
    <div>
        { showUser ? <Container>
                        <UserContainer>
                            <ImgContainer>
                                <Img onClick={()=>setShowRepo(true)} src={myResp.avatar_url} />
                            </ImgContainer>
                            <TextContainer>
                                <div><b>Nome:</b> {myResp.name}</div>
                                <div><b>Login:</b> {myResp.login}</div>
                                <div><b>ID:</b> {myResp.id}</div>
                                <br></br>
                                <div><b>CLICK</b> na imagem para ver o repositório!</div>
                            </TextContainer>
                        </UserContainer>
                                    
                        { showRepo ? <Repo name={userName}></Repo> : <></>}
                    </Container> 
                        : 
                    <Container>
                        <p>usuário inválido</p>
                        <p>Este usuário não existe!</p>
                    </Container> }
        

    </div>
 );
}

export default User;