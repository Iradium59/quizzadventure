import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Question from '../../database/models/question.model';
import Answer from '../../database/models/answer.model';
import Categorie from '../../database/models/categorie.model';

@Injectable()
export class QuestionSeeder {
  constructor(
    @InjectModel(Question)
    private questionModel: typeof Question,
    @InjectModel(Answer)
    private answerModel: typeof Answer,
    @InjectModel(Categorie)
    private categorieModel: typeof Categorie,
  ) {}

  async seed() {
    // Supprimer les données existantes
    await this.answerModel.destroy({ where: {} });
    await this.questionModel.destroy({ where: {} });
    await this.categorieModel.destroy({ where: {} });

    // Créer les catégories
    const categories = await this.categorieModel.bulkCreate([
      { name: 'Histoire' },
      { name: 'Géographie' },
      { name: 'Sciences' },
      { name: 'Culture générale' },
      { name: 'Sport' },
    ]);

    // Créer les questions et leurs réponses
    const questions = [
      {
        question: 'Quelle est la capitale de la France?',
        category: 2, // Géographie
        answers: [
          { answer: 'Paris', isCorrect: true },
          { answer: 'Lyon', isCorrect: false },
          { answer: 'Marseille', isCorrect: false },
          { answer: 'Bordeaux', isCorrect: false },
        ],
      },
      {
        question: 'En quelle année a eu lieu la Révolution française?',
        category: 1, // Histoire
        answers: [
          { answer: '1789', isCorrect: true },
          { answer: '1799', isCorrect: false },
          { answer: '1769', isCorrect: false },
          { answer: '1804', isCorrect: false },
        ],
      },
      {
        question: 'Qui a peint la Joconde?',
        category: 4, // Culture générale
        answers: [
          { answer: 'Léonard de Vinci', isCorrect: true },
          { answer: 'Michel-Ange', isCorrect: false },
          { answer: 'Raphaël', isCorrect: false },
          { answer: 'Botticelli', isCorrect: false },
        ],
      },
      {
        question: 'Quel est le plus grand océan du monde?',
        category: 2, // Géographie
        answers: [
          { answer: 'Océan Pacifique', isCorrect: true },
          { answer: 'Océan Atlantique', isCorrect: false },
          { answer: 'Océan Indien', isCorrect: false },
          { answer: 'Océan Arctique', isCorrect: false },
        ],
      },
      {
        question: 'Quelle est la formule chimique de l\'eau?',
        category: 3, // Sciences
        answers: [
          { answer: 'H2O', isCorrect: true },
          { answer: 'CO2', isCorrect: false },
          { answer: 'O2', isCorrect: false },
          { answer: 'H2SO4', isCorrect: false },
        ],
      },
      {
        question: 'Qui a écrit "Les Misérables"?',
        category: 4, // Culture générale
        answers: [
          { answer: 'Victor Hugo', isCorrect: true },
          { answer: 'Émile Zola', isCorrect: false },
          { answer: 'Gustave Flaubert', isCorrect: false },
          { answer: 'Alexandre Dumas', isCorrect: false },
        ],
      },
      {
        question: 'Quel sport pratique Kylian Mbappé?',
        category: 5, // Sport
        answers: [
          { answer: 'Football', isCorrect: true },
          { answer: 'Basketball', isCorrect: false },
          { answer: 'Tennis', isCorrect: false },
          { answer: 'Rugby', isCorrect: false },
        ],
      },
      {
        question: 'Quelle planète est connue comme la planète rouge?',
        category: 3, // Sciences
        answers: [
          { answer: 'Mars', isCorrect: true },
          { answer: 'Jupiter', isCorrect: false },
          { answer: 'Vénus', isCorrect: false },
          { answer: 'Saturne', isCorrect: false },
        ],
      },
      {
        question: 'Qui a découvert la pénicilline?',
        category: 3, // Sciences
        answers: [
          { answer: 'Alexander Fleming', isCorrect: true },
          { answer: 'Louis Pasteur', isCorrect: false },
          { answer: 'Marie Curie', isCorrect: false },
          { answer: 'Albert Einstein', isCorrect: false },
        ],
      },
      {
        question: 'Quelle est la plus haute montagne du monde?',
        category: 2, // Géographie
        answers: [
          { answer: 'Mont Everest', isCorrect: true },
          { answer: 'K2', isCorrect: false },
          { answer: 'Mont Blanc', isCorrect: false },
          { answer: 'Kilimandjaro', isCorrect: false },
        ],
      },
      {
        question: 'Qui a été le premier homme à marcher sur la Lune?',
        category: 1, // Histoire
        answers: [
          { answer: 'Neil Armstrong', isCorrect: true },
          { answer: 'Buzz Aldrin', isCorrect: false },
          { answer: 'Youri Gagarine', isCorrect: false },
          { answer: 'Alan Shepard', isCorrect: false },
        ],
      },
      {
        question: 'Quel est le plus grand pays du monde en termes de superficie?',
        category: 2, // Géographie
        answers: [
          { answer: 'Russie', isCorrect: true },
          { answer: 'Canada', isCorrect: false },
          { answer: 'Chine', isCorrect: false },
          { answer: 'États-Unis', isCorrect: false },
        ],
      },
      {
        question: 'Qui a écrit "Hamlet"?',
        category: 4, // Culture générale
        answers: [
          { answer: 'William Shakespeare', isCorrect: true },
          { answer: 'Molière', isCorrect: false },
          { answer: 'Oscar Wilde', isCorrect: false },
          { answer: 'Charles Dickens', isCorrect: false },
        ],
      },
      {
        question: 'Quelle est la capitale du Japon?',
        category: 2, // Géographie
        answers: [
          { answer: 'Tokyo', isCorrect: true },
          { answer: 'Kyoto', isCorrect: false },
          { answer: 'Osaka', isCorrect: false },
          { answer: 'Hiroshima', isCorrect: false },
        ],
      },
      {
        question: 'Quel est le symbole chimique de l\'or?',
        category: 3, // Sciences
        answers: [
          { answer: 'Au', isCorrect: true },
          { answer: 'Ag', isCorrect: false },
          { answer: 'Fe', isCorrect: false },
          { answer: 'Cu', isCorrect: false },
        ],
      },
      {
        question: 'En quelle année a commencé la Première Guerre mondiale?',
        category: 1, // Histoire
        answers: [
          { answer: '1914', isCorrect: true },
          { answer: '1918', isCorrect: false },
          { answer: '1939', isCorrect: false },
          { answer: '1945', isCorrect: false },
        ],
      },
      {
        question: 'Quel sport se joue à Wimbledon?',
        category: 5, // Sport
        answers: [
          { answer: 'Tennis', isCorrect: true },
          { answer: 'Golf', isCorrect: false },
          { answer: 'Cricket', isCorrect: false },
          { answer: 'Football', isCorrect: false },
        ],
      },
      {
        question: 'Qui a peint "La Nuit étoilée"?',
        category: 4, // Culture générale
        answers: [
          { answer: 'Vincent van Gogh', isCorrect: true },
          { answer: 'Claude Monet', isCorrect: false },
          { answer: 'Pablo Picasso', isCorrect: false },
          { answer: 'Salvador Dalí', isCorrect: false },
        ],
      },
      {
        question: 'Quelle est la plus grande forêt tropicale du monde?',
        category: 2, // Géographie
        answers: [
          { answer: 'Forêt amazonienne', isCorrect: true },
          { answer: 'Forêt du Congo', isCorrect: false },
          { answer: 'Forêt de Bornéo', isCorrect: false },
          { answer: 'Forêt de Sumatra', isCorrect: false },
        ],
      },
      {
        question: 'Qui a inventé la théorie de la relativité?',
        category: 3, // Sciences
        answers: [
          { answer: 'Albert Einstein', isCorrect: true },
          { answer: 'Isaac Newton', isCorrect: false },
          { answer: 'Niels Bohr', isCorrect: false },
          { answer: 'Stephen Hawking', isCorrect: false },
        ],
      },
    ];

    for (const questionData of questions) {
      const question = await this.questionModel.create({
        question: questionData.question,
        category: questionData.category,
      });

      for (const answerData of questionData.answers) {
        await this.answerModel.create({
          answer: answerData.answer,
          isCorrect: answerData.isCorrect,
          questionId: question.id,
        });
      }
    }

    console.log('Seeding completed successfully!');
  }
}
