import {Model, Column, Table, DataType} from 'sequelize-typescript';

@Table({
    tableName: 'categories',
    timestamps: false,
})
export default class Categorie extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
}