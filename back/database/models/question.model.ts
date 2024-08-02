import {Model, Column, Table, DataType} from 'sequelize-typescript';

@Table({
    tableName: 'questions',
    timestamps: false,
})
export default class Question extends Model {
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
    question: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    category: number;
}