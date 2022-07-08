import mockcountComments from '../__mock__/mockcountcomments.js';

const mockArrayComments = [
  {comment: 'Great', creation_date: '2022-07-07', username: 'Maria'},
  {comment: 'Yessssss', creation_date: '2022-07-07', username: 'Dario'},
  {creation_date: '2022-07-07', comment: 'Great', username: 'Jose'},
  {creation_date: '2022-07-07', comment: 'Great', username: 'Mauricio'},
  {username: 'Tomas', comment: 'Great', creation_date: '2022-07-07'}
]
    
describe('test function countComments', () => {
    test('count number of elemens in mockArrayComments', () => {
      expect(mockcountComments(mockArrayComments)).toBe(5);
    });
  });
