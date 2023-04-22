import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './style.css'
import api from './Services/api';


function App() {

  const [input, setInput] = useState('')
  const [zip, setZip] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("please fullfill zip code")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setZip(response.data)
      setInput('');

    } catch {
      alert("Error to catch zip code")
      setInput('')

    }


  }

  return (
    <div className="container">

      <h1 className="title">Zip Code Finder</h1>

      <div className="containerInput">
        <input type="text" placeholder="Type your zip code:"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="FFF" />
        </button>
      </div>

      {Object.keys(zip).length > 0 && (
       <main className='main'>
       <h2> Zip Code: {zip.cep}</h2>

       <span>{zip.logradouro} </span>
       <span>Complemento: {zip.complemento}</span>
       <span>{zip.bairro}</span>
       <span>{zip.localidade} - {zip.uf}</span>
       
     </main>
      )}
     

     
    </div>
  );
}

export default App;
