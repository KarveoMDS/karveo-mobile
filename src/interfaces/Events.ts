import {Car, GraduationCap, User, Users2} from 'lucide-react-native';
import type {IUser} from './User';

export type EventStatusType = 'pending' | 'confirmed' | 'canceled';
export type LessonType =
  | 'code'
  | 'conduite'
  | 'pedagogie'
  | 'examCode'
  | 'examConduite'
  | 'administratif'
  | 'evalInitial'
  | 'simulateur'
  | 'perfectionnement'
  | 'rattrapage'
  | 'autre';

export enum Lesson {
  CODE = 'code',
  CONDUITE = 'conduite',
  PEDAGOGIE = 'pedagogie',
  EXAM_CODE = 'examCode',
  EXAM_CONDUITE = 'examConduite',
  ADMINISTRATIF = 'administratif',
  EVAL_INITIAL = 'evalInitial',
  SIMULATEUR = 'simulateur',
  PERFECTIONNEMENT = 'perfectionnement',
  RATTRAPAGE = 'rattrapage',
  AUTRE = 'autre',
}

export enum EventStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirme',
  CANCELED = 'canceled',
}

export interface IEvent {
  _id: string;
  overlaps?: number;
  school: any;
  instructor: IUser;
  student: IUser;
  lessonType: LessonType;
  start: string;
  end: string;
  status: string;
  createdBy: object;
  updatedBy: object;
  createdAt: string;
  updatedAt: string;
  hasStudentValidated: boolean;
  hasInstructorValidated: boolean;
}

export interface IAgendaEvent extends IEvent {
  height: number;
  day: Date;
}

export interface IAddEvent {
  school: string;
  instructor: string;
  student: string;
  lessonType: LessonType;
  start: Date;
  end: Date;
  status: EventStatus;
  hasInstructorValidated: boolean;
  hasStudentValidated: boolean;
}

export const lessonTypes = [
  {
    value: Lesson.CODE,
    label: 'Cours de code',
    icon: GraduationCap,
    color: '#8416BD',
  },
  {
    value: Lesson.CONDUITE,
    label: 'Cours de conduite',
    icon: Car,
    color: '#46CAD9',
  },
  {
    value: Lesson.PEDAGOGIE,
    label: 'Rendez-vous pédagogique',
    icon: Users2,
    color: '#1D81F1',
  },
  {
    value: Lesson.EXAM_CODE,
    label: 'Examen de code',
    icon: GraduationCap,
    color: '#1B1464',
  },
  {
    value: Lesson.EXAM_CONDUITE,
    label: 'Passage du permis',
    icon: Car,
    color: '#8416BD',
  },
  {
    value: Lesson.ADMINISTRATIF,
    label: 'Rendez-vous administratif',
    icon: Users2,
    color: '#B1C1C0',
  },
  {
    value: Lesson.EVAL_INITIAL,
    label: 'Évaluation initiale',
    icon: GraduationCap,
    color: '#F97316',
  },
  {
    value: Lesson.SIMULATEUR,
    label: 'Cours sur simulateur',
    icon: Car,
    color: '#E54242',
  },
  {
    value: Lesson.PERFECTIONNEMENT,
    label: 'Session de perfectionnement',
    icon: Users2,
    color: '#c0c0c0',
  },
  {
    value: Lesson.RATTRAPAGE,
    label: 'Session de rattrapage',
    icon: Users2,
    color: '#808080',
  },
  {
    value: Lesson.AUTRE,
    label: 'Autre',
    icon: Users2,
    color: '#F7B32B',
  },
];

export const getLesson = (lessonType: LessonType) => {
  return lessonTypes.find(lesson => lesson.value === lessonType);
};

export type IUpdateEvent = Partial<IAddEvent>;
