module.exports = (sequelize, Sequelize) => {
    const Huesped = sequelize.define("Huespedes", {
        id_Huesped: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        documento_cantidad: {
            type: Sequelize.INTEGER
        },
        Telefono: {
            type: Sequelize.STRING
        },
        correo_elctronico:{
            type: Sequelize.INTEGER
        },
        habitacion: {
            type: Sequelize.STRING
        },
        

    });
    return Huesped;
};