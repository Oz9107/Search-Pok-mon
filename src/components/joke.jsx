import axios from "axios";
import { useState, useEffect } from "react";

const Joke = () => {
  //SINTANXIAS, AXIOS Y LUEGO EL METODO, (ARGUMENTO URL, otros).luego manejamos la promesa ya sea .then o .catch
  //axios.metodo( "url", "otros argumentos" )

  //los metodos http hacen referencia a la  accion que queremos llevar a cabo con el servidor
  //es decir que es lo que vamos a pedir al servidor
  //los metodos son: GET, POST, PUT/POATCH, DELETE
  //GET: LA LECTURA DE INFORMACION, TRAER LA INFORMACION O CONSULTAR SIN HACER NADA MAS
  //POST: CREAR NUEVA INFORMACION O GUARDALA A LA API
  //PUT/PATCH: MODIFICACION DE INFORMACION QUE YA EXISTE ES DECIR UNA ACTUALIZACION
  //DELETE: ELIMINAR INFORMACION DE LA BASE DE DATOS

  //AXIOS VA A TRABAJAR CON PROMESAS
  //Pedimos informacion, luego la url de la api axios.get("url") y lo envolvemos en un console.log para verlo en consola
  //veremos que esto generara un promesa

  const [joke, setJoke] = useState({});
  //al la api enviar un objeto tenemos que guardarlo en un objeto vacio
  //si devuelve un string es un string vacio, igual para un arreglo o un objetO

  //tenemos que proteger la informacion dentro de useEffect para que no se genere un bucle
  useEffect(() => {
    axios
      .get("https://api.chucknorris.io/jokes/random")
      //ahora la trabajamos con then y catch por ser una promesa
      .then((resp) => {
        //console.log(resp);
        console.log(resp.data);
        //tenemos que proteger la informacion dentro de useEffect
        //ACA NOS TOCA MIRAR COMO SE DESGLOSA EL ARREGLO Y SI NECESITA ALGUNA KEY [0,1,2,3]
        setJoke(resp.data);
      })
      .catch((error) => console.error(error));
  }, []);
  //veremos en consola que ocurre, la promesa se va ejecutar y en este caso sera el console.log(resp), es decir una respuesta del servidor
  //ahora lo que queremos nosotros es la data ya que aca es donde tenemos todos los datos

  return (
    <>
      <h1>{joke.value}</h1>
    </>
  );
};
export default Joke;
