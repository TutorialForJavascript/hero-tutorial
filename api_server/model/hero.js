import Sequelize from "sequelize"

const HeroModel = {
    name: "Hero",
    schema: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true,
        },
        score: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    },
    meta: {
        tableName: 'hero'
    }
}

export default HeroModel