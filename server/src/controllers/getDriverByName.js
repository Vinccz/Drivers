const { Driver } = require('../db');
const axios = require('axios');
const { Sequelize } = require('sequelize');

const getDriverByName = async (req, res) => {
    try {
        const name = req.query.name;
        
        const response = await axios.get(`http://localhost:5000/drivers?name.forename=${name}`);
        const apiDrivers = response.data;
        console.log(apiDrivers)
        const dbDrivers = await Driver.findAll({
            where: {
                name: {
                  [Sequelize.Op.iLike]: `%${name}%`,
                },
            },
            limit: 15,
        });

        const first15DriversByName = [...dbDrivers, ...apiDrivers];

        if (first15DriversByName.length > 0) {
            // Mapear los resultados para estructurar la respuesta
            const result = first15DriversByName.map(driver => ({
                name: driver.name.forename || driver.name,
                lastName: driver.name.surname || driver.lastName,
                description: driver.description,
                image: driver.image.url || driver.image,
                nationality: driver.nationality,
                bornDate: driver.dob || driver.bornDate,
            }));
            return res.status(200).json(result);
        }else return res.status(401).send('No existen pilotos con ese nombre.')
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = getDriverByName;