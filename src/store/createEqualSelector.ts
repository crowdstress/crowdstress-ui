import { createSelectorCreator, defaultMemoize } from 'reselect';
import { isEqual } from 'lodash';

export const createEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
