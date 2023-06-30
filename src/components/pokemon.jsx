import axios from "axios";
import { useState, useEffect } from "react";

const Pokemon = () => {
  const [info, setInfo] = useState({});
  //ACA NECESITAMOS UN ESTADO Y GENERAR QUE EL NUMERO SEA ALEATORIO
  //mirar la api y buscar donde esta la informacion total de los personajes

  const initialRandom = Math.floor(Math.random() * (1281 - 1) + 1);
  const [id, setId] = useState(initialRandom);

  useEffect(() => {
    //PARAMETRO ES UNA PARTE DINAMICA DE LA URL EN ESTE CASO ES => https://pokeapi.co/api/v2/pokemon
    //UN IDENTIFICADOR ES ALGO UNICO ES ESTE CASO ES => CHARIZARD
    //PARA QUE CAMBIE DE NUEVO SU UNIDAD DE MEDIDA CUANDO CARGUE
    setIsDecimeter(true)

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)

      .then((resp) => {
        console.log(resp.data);
        //ES DECIR LO DESGLOSAMOS COMO A UN ARREGLO EN JAVASRIPT
        setInfo(resp.data);
      })
      .catch((error) => console.error(error));
    //hay que colocar el identificador para que identifique el boton
  }, [id]);

  //ahora ajustamos el boton para que cambie el identificador
  const chageCharacter = () => {
    const random = Math.floor(Math.random() * (1281 - 1) + 1);
    setId(random);
  };
  //TRANSFORMAS UNICDADES DE MEDIDA
  //1dc decimetro es igual a 10cm
  //1hg hectogramos es igual a 0.1 kg
  const height = 17 //dc

  const [isDecimeters, setIsDecimeter] = useState(true)

  const chageUnits = () => {
    setIsDecimeter (!isDecimeters)
  }
  return (
    <>
      <div className="StylePokemon">
        <h3>Search your pokemon favorite</h3>
        <hr />
        <h3>Name: {info.name}</h3>
        <div>Height: {info.height}</div>
        <p>Base Experience: {info.base_experience}</p>
        <img
          className="ImagPok"
          src={info.sprites?.front_default}
          alt="Charizard"
        />
        <p>Best Attack: {info.moves ? info.moves[0].move.name : "No move"}</p>
        <p>Stats:</p>
        <p>HP: {info.stats ? info.stats[0].base_stat : "No stats"}</p>
        <p>Attack: {info.stats ? info.stats[1].base_stat : "No stats"}</p>
        <p>Defense: {info.stats ? info.stats[2].base_stat : "No stats"}</p>
        <p>Type: {info.types ? info.types[0].type.name : "No name"}</p>
        {/* Tambien es valido arreglo?.[0]?.nombre */}
        <p>
          Height: {isDecimeters ? height : height * 10}
          {isDecimeters ? "dc " : "cm "}
          <button onClick={chageUnits}>Change height units</button>
        </p>
        <p>
          Weight: {info.weight} <button>change weight units</button>
        </p>
        <button onClick={chageCharacter}>Change Pokemon</button>
        {/* ese error general de consola es un undefined info.location.name */}
        {/* se soluciona con encadenamiento opcional, si esta indefinido no sigue con el proceso pero si esta bien continua */}
        {/* CAMBIAR DE MANERA RAMDOM EN ESTE CASO LOS PERSONAJES */}
      </div>
    </>
  );
};

export default Pokemon;
