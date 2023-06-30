import axios from "axios";
import { useState, useEffect } from "react";

const Pokemon = () => {
  const [info, setInfo] = useState({});
  //ACA NECESITAMOS UN ESTADO Y GENERAR QUE EL NUMERO SEA ALEATORIO
  const [id, setId] = useState(Math.floor(Math.random() * (1281 - 1) + 1));
  const [isDecimeters, setIsDecimeters] = useState(true); // Estado para controlar las unidades de altura (decímetros o centímetros)
  const [isHectograms, setIsHectograms] = useState(true); // Estado para controlar las unidades de peso (hectogramos o kilogramos)

  useEffect(() => {
    //PARAMETRO ES UNA PARTE DINAMICA DE LA URL EN ESTE CASO ES => https://pokeapi.co/api/v2/pokemon
    //UN IDENTIFICADOR ES ALGO UNICO ES ESTE CASO ES => CHARIZARD
    //PARA QUE CAMBIE DE NUEVO SU UNIDAD DE MEDIDA CUANDO CARGUE
    setIsDecimeters(true); // Restablecer el estado de unidades de altura a decímetros
    setIsHectograms(true); // Restablecer el estado de unidades de peso a hectogramos

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((resp) => {
        console.log(resp.data);
        //ES DECIR LO DESGLOSAMOS COMO A UN ARREGLO EN JAVASRIPT
        setInfo(resp.data); // Actualizar la información del Pokémon obtenida de la API
      })
      .catch((error) => console.error(error));
    //hay que colocar el identificador para que identifique el boton
  }, [id]);

  //ahora ajustamos el boton para que cambie el identificador
  const changeCharacter = () => {
    const random = Math.floor(Math.random() * (1281 - 1) + 1);
    setId(random); // Cambiar el identificador del Pokémon de forma aleatoria al hacer clic en el botón
  };

  //TRANSFORMAS UNICDADES DE MEDIDA
  //1dc decimetro es igual a 10cm
  //1hg hectogramos es igual a 0.1 kg

  const toggleHeightUnits = () => {
    setIsDecimeters(!isDecimeters); // Cambiar el estado de unidades de altura al hacer clic en el botón
  };

  const toggleWeightUnits = () => {
    setIsHectograms(!isHectograms); // Cambiar el estado de unidades de peso al hacer clic en el botón
  };

  const getHeight = () => {
    const heightInDecimeters = info.height;
    return isDecimeters
      ? `${heightInDecimeters} dc ` // Mostrar la altura en decímetros si el estado es true
      : `${heightInDecimeters * 10} cm `; // Mostrar la altura en centímetros si el estado es false
  };

  const getWeight = () => {
    const weightInHectograms = info.weight;
    return isHectograms
      ? `${weightInHectograms} hg ` // Mostrar el peso en hectogramos si el estado es true
      : `${weightInHectograms / 10} kg `; // Mostrar el peso en kilogramos si el estado es false
  };

  return (
    <>
      <div className="StylePokemon">
        <h3>Search your favorite Pokémon</h3>
        <hr />
        <h3>Name: {info.name}</h3>
        <p>Base Experience: {info.base_experience}</p>
        <img
          className="ImagPok"
          src={info.sprites?.front_default}
          alt="Charizard"
        />
        <button onClick={changeCharacter}>Change Pokémon</button>
        <p>Best Attack: {info.moves ? info.moves[0].move.name : "No move"}</p>
        <p>Stats:</p>
        <p>HP: {info.stats ? info.stats[0].base_stat : "No stats"}</p>
        <p>Attack: {info.stats ? info.stats[1].base_stat : "No stats"}</p>
        <p>Defense: {info.stats ? info.stats[2].base_stat : "No stats"}</p>
        <p>Type: {info.types ? info.types[0].type.name : "No name"}</p>
        {/* Tambien es valido arreglo?.[0]?.nombre */}
        <p>
          Height: {getHeight()}
          {/* Cambia la unidad de altura cuando se hace clic en el botón */}
          <button onClick={toggleHeightUnits}>Change height units</button>
        </p>
        <p>
          Weight: {getWeight()}
          {/* Cambia la unidad de peso cuando se hace clic en el botón */}
          <button onClick={toggleWeightUnits}>Change weight units</button>
        </p>

        {/* ese error general de consola es un undefined info.location.name */}
        {/* se soluciona con encadenamiento opcional, si esta indefinido no sigue con el proceso pero si esta bien continua */}
        {/* CAMBIAR DE MANERA RAMDOM EN ESTE CASO LOS PERSONAJES */}
      </div>
    </>
  );
};

export default Pokemon;
