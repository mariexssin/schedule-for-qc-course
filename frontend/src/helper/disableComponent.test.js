import {getClearOrCancelTitle, setDisableButton, setDisabledSaveButtonSemester,} from './disableComponent';
import {CANCEL_BUTTON_TITLE, CLEAR_BUTTON_LABEL,} from '../constants/translationLabels/formElements';
import i18n from '../i18n';

const semester = {
    id: 47,
    description: '1 2021- 2022',
    year: 2021,
    startDay: '01/09/2021',
    endDay: '30/12/2021',
    currentSemester: true,
    defaultSemester: true,
    disable: false,
    semester_days: ['FRIDAY'],
    semester_classes: [],
    semester_groups: [
        {
            id: 52,
            title: '21 (201-Б)',
        },
    ],
};
const selectedGroups = [
    {
        id: 52,
        label: '21 (201-Б)',
    },
];

describe('setDisableButton function', () => {
    it('should return false if pristine equal false', () => {
        const pristine = false;
        expect(setDisableButton(pristine, false, null)).toBeFalsy();
    });
    it('should return false if id equal 49', () => {
        const id = 49;
        expect(setDisableButton(true, false, id)).toBeFalsy();
    });
    it('should return true if pristine, submitting equal true, and if the id is undefined or null', () => {
        const pristine = true;
        const submitting = true;
        let id = null;
        expect(setDisableButton(pristine, submitting, id)).toBeTruthy();
        id = undefined;
        expect(setDisableButton(pristine, submitting, id)).toBeTruthy();
    });
});

describe('getClearOrCancelTitle function', () => {
    it('should return clear_button_label if id equal undefined', () => {
        const id = undefined;
        expect(getClearOrCancelTitle(id, i18n.t)).toEqual(CLEAR_BUTTON_LABEL);
    });
    it('should return cancel_button_title if id equal 49', () => {
        const id = 49;
        expect(getClearOrCancelTitle(id, i18n.t)).toEqual(CANCEL_BUTTON_TITLE);
    });
});

describe('setDisabledSaveButtonSemester function', () => {
    describe('pristine or submitting equal true', () => {
        let pristine = true;
        let submitting = false;
        it('should return true if semester is empty, null, or undefined', () => {
            expect(setDisabledSaveButtonSemester(pristine, submitting, {})).toBeTruthy();
            [pristine, submitting] = [submitting, pristine];
            expect(setDisabledSaveButtonSemester(pristine, submitting, {})).toBeTruthy();
        });
        it('should return true if semester are not empty and selectedGroups is in semester.semester_groups', () => {
            expect(
                setDisabledSaveButtonSemester(pristine, submitting, semester, selectedGroups),
            ).toBeTruthy();
            [pristine, submitting] = [submitting, pristine];
            expect(
                setDisabledSaveButtonSemester(pristine, submitting, semester, selectedGroups),
            ).toBeTruthy();
        });
    });

    describe('pristine and submitting equal false', () => {
        const pristine = false;
        const submitting = false;
        it('should return false if semester is empty, null, or undefined', () => {
            expect(setDisabledSaveButtonSemester(pristine, submitting, {})).toBeFalsy();
        });
        it('should return false if semester are not empty and selectedGroups has a new group for the semester ', () => {
            expect(
                setDisabledSaveButtonSemester(pristine, submitting, semester, [
                    ...selectedGroups,
                    {
                        id: 82,
                        label: '22 (204-A)',
                    },
                ]),
            ).toBeFalsy();
        });
        it('should return false if semester are not empty and selectedGroups is in semester.semester_groups ', () => {
            expect(
                setDisabledSaveButtonSemester(pristine, submitting, semester, selectedGroups),
            ).toBeFalsy();
        });
    });

    // ДОДАНО
    describe('Kill specific surviving mutants (lines 15, 18, 19)', () => {
        it('should kill logical operator mutant on line 15 (&& changed to ||)', () => {
            const mutant1Semester = { semester_groups: [] }; 
            expect(setDisabledSaveButtonSemester(true, false, mutant1Semester, [])).toBeTruthy();
        });

        it('should kill filter mutant for newGroups on line 18', () => {
            const addedGroups = [...selectedGroups, { id: 99, label: 'New Group' }];
            expect(setDisabledSaveButtonSemester(true, false, semester, addedGroups)).toBeFalsy();
        });

        it('should kill filter mutant for deleteGroups on line 19', () => {
            expect(setDisabledSaveButtonSemester(true, false, semester, [])).toBeFalsy();
        });
    });

    // ДОДАНО
    it('should handle null semester and undefined selectedGroups correctly', () => {
        expect(setDisabledSaveButtonSemester(true, false, null, undefined)).toBeTruthy();
        
        expect(setDisabledSaveButtonSemester(false, false, null, undefined)).toBeFalsy();
    });
});