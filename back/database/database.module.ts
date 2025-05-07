import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Question from './models/question.model';
import Categorie from './models/categorie.model';
import History from './models/history.model';
import Answer from './models/answer.model';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT, 10) || 3306,
            username: process.env.DB_USER || 'quizz',
            password: process.env.DB_PASS || 'quizz',
            database: process.env.DB_NAME || 'quizz',	
            autoLoadModels: true,
            synchronize: true,
        }),
        SequelizeModule.forFeature([Question, Categorie, History, Answer]),
    ],
    exports: [SequelizeModule]
})
export class DatabaseModule {}
