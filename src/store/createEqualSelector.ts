import { isEqual } from 'lodash';
import { createSelectorCreator, defaultMemoize } from 'reselect';

export const createEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
