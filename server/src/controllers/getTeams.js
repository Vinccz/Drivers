const { Team } = require("../db");
const axios = require("axios");

const getTeams = async (req, res) => {
    try {
        // Consultar en la base de datos
          const dbTeams = await Team.findAll();
        // Si la base de datos está vacía, obtener equipos de la API
          const response = await axios.get('http://localhost:5000/drivers');
          const apiDrivers = response.data;
          
        // Extraer y procesar la lista de equipos de los drivers de la API
          const teamsFromApi = apiDrivers.reduce((teamsList, driver) => {
        // Asegurarse de que driver.teams es una cadena antes de dividir
          if (typeof driver.teams === 'string' || driver.teams instanceof String) {
          const driverTeams = driver.teams.split(',').map(team => team.trim());
          return [...teamsList, ...driverTeams];
        } else {
          return teamsList;
        }
          }, []);
      
        // Eliminar duplicados y guardar los equipos en la base de datos
          const uniqueTeams = [...new Set(teamsFromApi)];
          await Team.bulkCreate(uniqueTeams.map(team => ({ name: team })));
          dbTeams.forEach(team => {
            uniqueTeams.push(team.name)
          });
        // Devolver los equipos obtenidos de la API
          res.status(200).json(uniqueTeams);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = getTeams;