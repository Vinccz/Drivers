const { Driver, Team, driverTeams } = require ("../db");
const axios = require('axios');

const allDrivers = async (req, res) => {
    try {
        // Hacer la solicitud a la API en el puerto 5000
        const response = await axios.get('http://localhost:5000/drivers');
        // Hacer solicitud a la Base de Datos
        const driversFromDB = await Driver.findAll({
            include:{
                model: Team,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        });

        const drivers = [...response.data, ...driversFromDB]
        
        console.log(driversFromDB)

        return res.status(200).json(drivers);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = allDrivers;