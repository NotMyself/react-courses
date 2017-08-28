import expect from 'expect';
import * as selectors from "./selectors";


describe('Author Selectors', () => {
  describe('authorsFormattedForDropdown', () => {
    const authors = [
      { id: 'cory-house', firstName: 'Cory', lastName: 'House'},
      { id: 'scott-allen', firstName: 'Scott', lastName: 'Allen'}
    ];

    const expected = [
      { value: 'cory-house', text: 'Cory House'},
      { value: 'scott-allen', text: 'Scott Allen'}
    ];

    expect(selectors.authorsFormattedForDropdown(authors)).toEqual(expected);
  });
});
