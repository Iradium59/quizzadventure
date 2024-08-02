import { Model, Column, Table, DataType, ForeignKey } from 'sequelize-typescript';
import Question from './question.model';

@Table({
    tableName: 'answers',
    timestamps: false,
})
export default class Answer extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    answer: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isCorrect: boolean;

    @ForeignKey(() => Question)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    questionId: number;
}
