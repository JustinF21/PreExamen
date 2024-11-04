const db = require('../config/db.config.js');
const Huesped = db.Huesped; // Assuming Huesped is defined in your db configuration

// Create a new Huesped
exports.create = (req, res) => {
    let huesped = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        documento_cantidad: req.body.documento_cantidad,
        Telefono: req.body.Telefono,
        correo_electronico: req.body.correo_electronico,
        habitacion: req.body.habitacion,
    };

    try {
        Huesped.create(huesped).then(result => {
            res.status(200).json({
                message: "Huesped creado exitosamente con id = " + result.id_Huesped,
                huesped: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el huesped!",
            error: error.message,
        });
    }
};

// Retrieve all Huespedes
exports.retrieveAllHuespedes = (req, res) => {
    Huesped.findAll()
        .then(huespedInfos => {
            res.status(200).json({
                message: "¡Huespedes obtenidos exitosamente!",
                huespedes: huespedInfos,
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los huespedes!",
                error: error,
            });
        });
};

// Get a Huesped by ID
exports.getHuespedById = (req, res) => {
    let huespedId = req.params.id;
    Huesped.findByPk(huespedId)
        .then(huesped => {
            if (huesped) {
                res.status(200).json({
                    message: "Huesped obtenido exitosamente con id = " + huespedId,
                    huesped: huesped,
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el huesped con id = " + huespedId,
                    error: "404",
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener huesped con id!",
                error: error,
            });
        });
};

// Update a Huesped by ID
exports.updateById = async (req, res) => {
    try {
        let huespedId = req.params.id;
        let huesped = await Huesped.findByPk(huespedId);
    
        if (!huesped) {
            res.status(404).json({
                message: "No se encontró el huesped para actualizar con id = " + huespedId,
                huesped: "",
                error: "404",
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                documento_cantidad: req.body.documento_cantidad,
                Telefono: req.body.Telefono,
                correo_electronico: req.body.correo_electronico,
                habitacion: req.body.habitacion,
            };
            let result = await Huesped.update(updatedObject, { returning: true, where: { id_Huesped: huespedId } });
            
            if (!result[0]) {
                res.status(500).json({
                    message: "No se puede actualizar un huesped con id = " + huespedId,
                    error: "No se pudo actualizar el huesped",
                });
            } else {
                res.status(200).json({
                    message: "Actualización exitosa de un huesped con id = " + huespedId,
                    huesped: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un huesped con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Delete a Huesped by ID
exports.deleteById = async (req, res) => {
    try {
        let huespedId = req.params.id;
        let huesped = await Huesped.findByPk(huespedId);

        if (!huesped) {
            res.status(404).json({
                message: "No existe el huesped con id = " + huespedId,
                error: "404",
            });
        } else {
            await huesped.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del huesped con id = " + huespedId,
                huesped: huesped,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un huesped con id = " + req.params.id,
            error: error.message,
        });
    }
};
