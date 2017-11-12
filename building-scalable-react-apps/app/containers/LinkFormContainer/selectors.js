import { createSelector } from 'reselect';

/**
 * Direct selector to the linkFormContainer state domain
 */
const selectLinkFormContainerDomain = () => state => state.get('linkFormContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LinkFormContainer
 */

const selectLinkFormContainer = () => createSelector(
  selectLinkFormContainerDomain(),
  (substate) => substate.toJS()
);

export default selectLinkFormContainer;
export {
  selectLinkFormContainerDomain,
};
