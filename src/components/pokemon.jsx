import axios from "axios";
import { useState, useEffect } from "react";

const Pokemon = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/charizard")

      .then((resp) => {
        console.log(resp.data);
        //ES DECIR LO DESGLOSAMOS COMO A UN ARREGLO EN JAVASRIPT
        setInfo(resp.data);
      })
      .catch((error) => console.error(error));
  }, []);

  //cuando sale un error en consola que se refresca la pantalla y se cae la informacion se soluciona de la siguiente manera:

  //encadenamiento opcional = valorEvaluado ?. extracionesPosteriores
  //seria : info.location?.name
  //hay dice que info.locaticon lo valide y si esta bien que siga en su extraccion
  return (
    <>
      <h1>Name: {info.name}</h1>
      <div>Age {info.height}</div>
      <p>base expetience: {info.base_experience}</p>
      <img src={info.sprites?.back_default} alt="Charizar" />
      {/* AHORA SI VA MAS DE 3 POSICION EN EL DESPLIEGUE UTILIZAMOS LA SIGUIEN MANETA: */}
      <h2>best attack : {info.moves ? info.moves[0].move.name : "No move"}</h2>
      <h3>stats: {info.stats ? info.stats[0].stat.name : "No stats"}</h3>
      <h3>hp: {info.stats ? info.stats[0].base_stat : "No stats"}</h3>
      <h3>attack: {info.stats ? info.stats[1].base_stat : "No stats"}</h3>
      <h3>Defense: {info.stats ? info.stats[2].base_stat : "No stats"}</h3>
      <h3>
        Type: {info.types ? info.types[0].type.name : "No name"} and{" "}
        {info.types ? info.types[1].type.name : "No name"}
      </h3>
      <p>weight: {info.weight}</p>
      {/* ese error general de consola es un undefined info.location.name */}
      {/* se soluciona con encadenamiento opcional, si esta indefinido no sigue con el proceso pero si esta bien continua */}
    </>
  );
};
export default Pokemon;
