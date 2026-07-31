import mongoose from 'mongoose';
import { MockCollection } from './mockDb.js';

class MockQuery {
  constructor(promise) {
    this.promise = promise;
  }

  select(fields) {
    this.promise = this.promise.then(result => {
      if (!result) return result;
      if (Array.isArray(result)) {
        return result.map(item => {
          const cloned = { ...item };
          if (typeof fields === 'string' && fields.startsWith('-')) {
            const fieldToRemove = fields.substring(1);
            delete cloned[fieldToRemove];
          }
          return cloned;
        });
      } else {
        const cloned = { ...result };
        if (typeof fields === 'string' && fields.startsWith('-')) {
          const fieldToRemove = fields.substring(1);
          delete cloned[fieldToRemove];
        }
        return cloned;
      }
    });
    return this;
  }

  populate(path) {
    return this;
  }

  sort(args) {
    return this;
  }

  limit(num) {
    return this;
  }

  skip(num) {
    return this;
  }

  lean() {
    return this;
  }

  then(onfulfilled, onrejected) {
    return this.promise.then(onfulfilled, onrejected);
  }

  catch(onrejected) {
    return this.promise.catch(onrejected);
  }
}

export function getModel(modelName, schema) {
  let compileModel;
  try {
    compileModel = mongoose.model(modelName);
  } catch {
    compileModel = mongoose.model(modelName, schema);
  }

  const mock = new MockCollection(modelName);

  // Return a proxy that checks Mongoose connection state on every access
  return new Proxy(compileModel, {
    get(target, prop) {
      const isConnected = mongoose.connection.readyState === 1;

      if (isConnected) {
        const val = target[prop];
        if (typeof val === 'function') {
          return val.bind(target);
        }
        return val;
      } else {
        // Fallback to mock collection methods
        const val = mock[prop];
        if (typeof val === 'function') {
          return (...args) => {
            const res = val.apply(mock, args);
            if (res && typeof res.then === 'function') {
              return new MockQuery(res);
            }
            return res;
          };
        }
        return val;
      }
    }
  });
}
