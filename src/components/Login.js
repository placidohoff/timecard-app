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
    
    const guestUser = (e) => {
        dispatch({
            type: 'LOGIN',
            item: {
                user: 'guestUser@sample.com',
                fullName: 'Guest User'
            }
        })
        
        history.push('/viewcards');

    }
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
            <Container style={{minHeight:'100vh'}}>
                <Row className="justify-content-center">
                    <Col></Col>
                    <Col className="justify-content-center" style={{marginTop: '20px'}}>
                <p style={{marginLeft:'7.5vw', fontWeight:'bold'}}>TIME-CARD APPLICATION</p>
            <form>
                <div className="justify-content-md-center" style={{marginLeft:'5vw'}}>
                <input 
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                    onBlur={e => {setName(getFullName(email))}}
                    type="text"
                    placeholder="email"
                    style={{marginBottom: '10px', width: '250px'}}
                />
                <br />
                
                <input 
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                    type="password"
                    placeholder="password"
                    style={{marginBottom: '10px', width: '250px'}}
                />
                </div>
                <br />
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
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
                            marginBottom: '10px'
                            // margin: 'auto'
                            // marginTop: '5px'
                        }}
                    >
                        Login
                    </button>
                    <button
                        type="submit"
                        onClick={guestUser}
                        style={{
                            width: '100px'
                            // margin: 'auto'
                            // marginTop: '5px'
                        }}
                    >
                        Guest User
                    </button>
                </div>
                </Col>
                <Col></Col>
                </Row>
                </Container>
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
            <Container style={{marginTop:'-20px'}}><Row><Col></Col><Col><p style={{fontSize: '10px', marginLeft:'9vw'}}>Developer: Placido Hoff</p></Col><Col></Col></Row></Container>
            
        </div>
        

    )
}

export default Login;