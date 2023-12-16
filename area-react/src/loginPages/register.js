import logo from '../logo.svg';
import './login.css';
// il faut retirer tout les <br></br> et le refaire avec des flex box
export function Register() {
  return (
    <div className="App">
      <div className="LoginCage">
      <span className="title">WELCOME !</span>
      <br></br>
      <br></br>
      <div className='divinputinfo'>
      <input type='text' className='inputinfo' placeholder='Name'></input>
      <input type = "text" className='inputinfo' placeholder='first name'></input>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <input type = "email" className='inputconnexion' placeholder='Email'></input>
      <br></br>
      <br></br>
      <input type = "email" className='inputconnexion' placeholder='Confirm Email'></input>
      <br></br>
      <br></br>
      <input type = "password" className='inputconnexion' placeholder='Password'></input>
      <br>
      </br>
      <br></br>
      <a href = "dev" style={{color : "rgba(86, 128, 233, 1)"}}>forget password ?</a>
      <br></br>
      <br></br>
      <a href = "lien">
        <div className='Button'>
          <p className='ButtonText'>Sign In</p>
        </div>
      </a>
      <br></br>
      <br></br>
      <div className='line'></div>
      <br>
      </br>
      <div style={{flexDirection :'row', display : 'flex', justifyContent : 'space-between'}}>
        <div className='SocialButton'>
          <img style={{width : 50, height : 50}} src = "https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_640.png"></img>
        </div>
        <div className='SocialButton'>
        <img style={{width : 50, height : 50}} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/480px-Facebook_f_logo_%282019%29.svg.png"></img>
        </div>
        <div className='SocialButton'>
        <img style={{width : 50, height : 50}} src = "https://assets.stickpng.com/images/580b57fcd9996e24bc43c516.png"></img>
        </div>
      </div>


      </div>
    </div>
  );
}
