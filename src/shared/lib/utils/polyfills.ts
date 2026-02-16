// @ts-expect-error no types package available
import toSorted from 'array.prototype.tosorted';

// Pollyfill of the toSorted method
toSorted.shim();
