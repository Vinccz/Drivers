const axios = require("axios");

const getDriverById = async (req, res) => {
    try {
        const id = req.params.idDriver;
        const drivers = [];
        const APIDriverResponse = await axios.get(`http://localhost:5000/drivers/${id}`);
        const APIDriver = APIDriverResponse.data;
        console.log(APIDriver)
        if (APIDriver) {
            drivers.push(APIDriver);
        };
        const result = drivers.map(driver => ({
            id: driver.id,
            name: driver.name.forename,
            lastName: driver.name.surname,
            image: driver.image.url,
            nationality: driver.nationality,
            bornDate: driver.dob,
            description: driver.description,
        }));
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(401).send("No existe un driver con ese id.");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = getDriverById;