module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define("Libros", {
        id_libro: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: Sequelize.STRING
        },
        autor: {
            type: Sequelize.STRING
        },
        isbn: {
            type: Sequelize.INTEGER
        },
        editorial: {
            type: Sequelize.STRING
        },
        anio_publicacion:{
            type: Sequelize.INTEGER
        },
        categoria: {
            type: Sequelize.STRING
        },
        cantidad_disponible: {
            type: Sequelize.INTEGER
        },
        ubicacion: {
            type: Sequelize.STRING
        }

    });
    return Libro;
};