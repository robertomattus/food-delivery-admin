import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado para el loading

  const fetchList = async () => {
    try {
      setIsLoading(true); // Indicamos que estamos cargando
      const response = await axios.get(`${url}/api/food/list`);
      setList(response.data.data); // Actualizamos la lista con los datos obtenidos
    } catch (error) {
      toast.error("Error");
    } finally {
      setIsLoading(false); // Terminamos de cargar
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      await fetchList(); // Refrescamos la lista después de eliminar
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList(); // Solo se ejecuta una vez al cargar el componente
  }, []); // El arreglo vacío asegura que solo se ejecute una vez al montar el componente

  return (
    <div className="list add flex-col">
      <p>Todos los Items</p>
      {isLoading ? (
        <p>Cargando...</p> // Mensaje de carga
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Imagen</b>
            <b>Nombre</b>
            <b>Categoria</b>
            <b>Precio</b>
            <b>Acción</b>
          </div>
          {list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
