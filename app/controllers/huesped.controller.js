const db = require('../config/db.config.js');
const Huesped = db.Huesped;

exports.create = (req, res) => {
    let huesped = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        documento_cantidad: req.body.documento_cantidad,
        Telefono: req.body.Telefono,
        correo_electronico: req.body.correo_electronico, // Asegúrate de que el nombre del campo coincida
        habitacion: req.body.habitacion
    };

    Huesped.create(huesped)
        .then(result => {
            res.status(201).json({
                message: "Huésped creado exitosamente con id = " + result.id_Huesped,
                huesped: result,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Fallo al crear el huésped!",
                error: error.message
            });
        });
};

exports.retrieveAllHuespedes = (req, res) => {
    Huesped.findAll()
        .then(huespedInfos => {
            res.status(200).json({
                message: "¡Huéspedes obtenidos exitosamente!",
                huespedes: huespedInfos
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                message: "¡Error al obtener los huéspedes!",
                error: error.message
            });
        });
};

exports.getHuespedById = (req, res) => {
    let huespedId = req.params.id;
    Huesped.findByPk(huespedId)
        .then(huesped => {
            if (!huesped) {
                return res.status(404).json({
                    message: "No se encontró el huésped con id = " + huespedId,
                    error: "404"
                });
            }
            res.status(200).json({
                message: "Huésped obtenido exitosamente con id = " + huespedId,
                huesped: huesped
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                message: "¡Error al obtener huésped con id!",
                error: error.message
            });
        });
};

exports.updateById = async (req, res) => {
    let huespedId = req.params.id;

    try {
        let huesped = await Huesped.findByPk(huespedId);

        if (!huesped) {
            return res.status(404).json({
                message: "No se encontró el huésped para actualizar con id = " + huespedId,
                error: "404"
            });
        }

        let updatedObject = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            documento_cantidad: req.body.documento_cantidad,
            Telefono: req.body.Telefono,
            correo_electronico: req.body.correo_electronico, // Asegúrate de que el nombre del campo coincida
            habitacion: req.body.habitacion
        };

        const [updatedRowCount, updatedRows] = await Huesped.update(updatedObject, {
            returning: true,
            where: { id_Huesped: huespedId }
        });

        if (updatedRowCount === 0) {
            return res.status(500).json({
                message: "No se pudo actualizar el huésped con id = " + req.params.id,
                error: "No se pudo actualizar el huésped",
            });
        }

        res.status(200).json({
            message: "Actualización exitosa de un huésped con id = " + huespedId,
            huesped: updatedRows[0], // Muestra el nuevo objeto actualizado
        });
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un huésped con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    let huespedId = req.params.id;

    try {
        let huesped = await Huesped.findByPk(huespedId);

        if (!huesped) {
            return res.status(404).json({
                message: "No existe el huésped con id = " + huespedId,
                error: "404",
            });
        }

        await huesped.destroy();
        res.status(200).json({
            message: "Eliminación exitosa del huésped con id = " + huespedId,
            huesped: huesped,
        });
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un huésped con id = " + req.params.id,
            error: error.message,
        });
    }
};
