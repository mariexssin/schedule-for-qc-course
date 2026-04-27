import {cardObjectHandler} from './cardObjectHandler';

describe('cardObjectHandler function', () => {
    const card = {
        lessonCardId: 12,
        hours: 2,
        subject: { id: 2 },
        type: 'lecture',
        subjectForSite: 'Алгебра',
        teacher: {
            id: 4,
            name: 'Іван',
            surname: 'Блажевський',
            patronymic: 'Іванович',
            position: 'доцент',
        },
        groups: [{ id: 12, title: '123' }],
        grouped: true,
    };
    const link = 'http://youtube.com';
    const semester = { id: 6 };

    it('should return correct values', () => {
        expect(cardObjectHandler(card, semester, link)).toEqual({
            id: card.lessonCardId,
            hours: card.hours,
            subject: { id: card.subject.id },
            lessonType: card.type,
            subjectForSite: card.subjectForSite,
            teacher: card.teacher,
            linkToMeeting: link,
            groups: card.groups,
            grouped: card.grouped,
            semester,
        });
    });

    // ДОДАНО
    it('should convert string numbers to numbers', () => {
        const stringCard = {
            lessonCardId: '12',
            hours: '2',
            subject: { id: '2' },
        };
        const result = cardObjectHandler(stringCard, semester, link);
        
        expect(result.id).toStrictEqual(12);
        expect(result.hours).toStrictEqual(2);
        expect(result.subject.id).toStrictEqual(2);
    });

    // ДОДАНО
    it('should handle 0 values correctly', () => {
        const zeroCard = {
            lessonCardId: 0,
            hours: 0,
            subject: { id: 0 },
        };
        const result = cardObjectHandler(zeroCard, semester, link);
        
        expect(result.id).toStrictEqual(0);
        expect(result.hours).toStrictEqual(0);
        expect(result.subject.id).toStrictEqual(0);
    });

    // ДОДАНО
    it('should handle card with empty subject safely', () => {
        const emptyCard = {
            subject: {} 
        };
        const result = cardObjectHandler(emptyCard, semester, link);
        
        expect(result.id).toBeNaN();
        expect(result.hours).toBeNaN();
        expect(result.subject.id).toBeNaN();
        expect(result.lessonType).toBeUndefined();
    });

     // ДОДАНО
    it('should handle empty card safely', () => {
        const emptyCard = {};

        expect(() => {
            cardObjectHandler(emptyCard, semester, link);
        }).toThrow(TypeError);
    });
});