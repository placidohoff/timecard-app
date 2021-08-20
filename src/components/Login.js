import React, { useState } from 'react'

import { auth, db } from '../util/firebase.js'
import { useStateValue } from '../util/StateProvider.js'
import { useHistory } from 'react-router-dom'
import { getFullName } from '../util/emailUsernameTable.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'

function Login(){
    const [{user, fullName}, dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [userError, setUserError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const history = useHistory();
    
    const loginUser = (e) => {
        e.preventDefault();
    
        //ERROR:
        if(email == '' || password == ''){

            setUserError(true)
            
            setErrorMessage('Please fill out both fields')
        }

        //PROCEED:
        else{            
                auth
                .signInWithEmailAndPassword(email, password)
                
                //SUCCESS:
                .then(auth => { 
                    dispatch({
                        type: 'LOGIN',
                        item: {
                            user: email,
                            fullName: name
                        }
                    })
                    
                    history.push('/viewcards');
                })

                //ERROR:
                .catch(
                    error =>{ 
                        //alert(error.message)
                        setUserError(true)
                        console.log('error')
                        //setErrorMessage("The login was unsuccessful")
                    }
                )
            
        }
    }

    return(
        <div className="login">
            <Container>
                <Row>
                    <Col></Col>
                    <Col style={{marginTop: '20px'}}>
            <form>
                
                <input 
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                    onBlur={e => {setName(getFullName(email))}}
                    type="text"
                    placeholder="email"
                    style={{marginBottom: '10px'}}
                />
                <br />
                
                <input 
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                    type="password"
                    placeholder="password"
                    style={{marginBottom: '10px'}}
                />
                <br />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <button
                        type="submit"
                        onClick={loginUser}
                        style={{
                            width: '100px',
                            margin: 'auto'
                            // marginTop: '5px'
                        }}
                    >
                        Login
                    </button>
                </div>
            </form>
            {
                userError
                ?
                <div className="login__error">Error: {errorMessage} </div>
                :
                <></>
            }
            </Col>
            <Col></Col>
            </Row>
            </Container>
            
        </div>
        

    )
}

export default Login;