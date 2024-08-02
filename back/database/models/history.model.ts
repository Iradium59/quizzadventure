import { Model, Column, Table, DataType, AllowNull} from 'sequelize-typescript';

@Table({
    tableName: 'history',
    timestamps: true,
})
export default class History extends Model {
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
    user: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    score: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    answered_question_count: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    questions: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    state: string;
}

