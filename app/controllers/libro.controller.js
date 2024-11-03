const db = require('../config/db.config.js');
const Libro = db.Libro;

exports.create = (req, res) => {
    let libro = {};

    try {
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.isbn = req.body.isbn;
        libro.editorial = req.body.editorial;
        libro.anio_publicacion = req.body.anio_publicacion;
        libro.categoria = req.body.categoria;
        libro.cantidad_disponible = req.body.cantidad_disponible;
        libro.ubicacion = req.body.ubicacion;

        Libro.create(libro).then(result => {
            res.status(200).json({
                message: "libro creado exitosamente con id = " + result.id_libro,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el libro!",
            error: error.message
        });
    }
};

exports.retrieveAllEmpleados = (req, res) => {
    Empleado.findAll()
        .then(empleadoInfos => {
            res.status(200).json({
                message: "¡Empleados obtenidos exitosamente!",
                empleados: empleadoInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los empleados!",
                error: error
            });
        });
};

exports.getLibroById = (req, res) => {
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro => {
            res.status(200).json({
                message: "libro obtenido exitosamente con id = " + libroId,
                libro: libro
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener libro con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);
    
        if (!libro) {
            res.status(404).json({
                message: "No se encontró el libro para actualizar con id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                titulo: req.body.titulo,
                autor: req.body.autor,
                isbn: req.body.isbn,  
                editorial: req.body.editorial,
                anio_publicacion: req.body.anio_publicacion,
                categoria: req.body.categoria,
                cantidad_disponible: req.body.cantidad_disponible,
                ubicacion: req.body.ubicacion
            }
            let result = await Libro.update(updatedObject, {returning: true, where: {id_libro: libroId}});
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un libro con id = " + req.params.id,
                    error: "No se pudo actualizar el libro",
                });
            };

            res.status(200).json({
                message: "Actualización exitosa de un libro con id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un libro con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe el libro con id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del libro con id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un libro con id = " + req.params.id,
            error: error.message,
        });
    }
}