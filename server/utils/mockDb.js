import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export class MockCollection {
  constructor(modelName) {
    this.modelName = modelName;
    this.filePath = path.join(DATA_DIR, `${modelName.toLowerCase()}s.json`);
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  read() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data || '[]');
    } catch {
      return [];
    }
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  async find(query = {}) {
    let items = this.read();
    
    // Simple filter matching
    return items.filter(item => {
      for (const key in query) {
        if (query[key] && typeof query[key] === 'object' && query[key].$regex) {
          const reg = new RegExp(query[key].$regex, query[key].$options || 'i');
          if (!reg.test(item[key])) return false;
        } else if (query[key] && typeof query[key] === 'object' && query[key].$gte !== undefined) {
          if (item[key] < query[key].$gte) return false;
        } else if (query[key] && typeof query[key] === 'object' && query[key].$lte !== undefined) {
          if (item[key] > query[key].$lte) return false;
        } else if (query[key] !== undefined && item[key] !== query[key]) {
          // If array field checks if item includes
          if (Array.isArray(item[key]) && item[key].includes(query[key])) continue;
          return false;
        }
      }
      return true;
    });
  }

  async findOne(query = {}) {
    const items = await this.find(query);
    return items[0] || null;
  }

  async findById(id) {
    return this.findOne({ _id: id });
  }

  async create(doc) {
    const items = this.read();
    const newDoc = {
      _id: doc._id || Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      ...doc
    };
    items.push(newDoc);
    this.write(items);
    return newDoc;
  }

  async insertMany(docs) {
    const items = this.read();
    const newDocs = docs.map(doc => ({
      _id: doc._id || Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      ...doc
    }));
    items.push(...newDocs);
    this.write(items);
    return newDocs;
  }

  async findByIdAndUpdate(id, update, options = {}) {
    const items = this.read();
    const idx = items.findIndex(item => item._id === id);
    if (idx === -1) return null;

    // Apply updates
    const updated = { ...items[idx], ...update };
    if (update.$inc) {
      for (const incKey in update.$inc) {
        updated[incKey] = (updated[incKey] || 0) + update.$inc[incKey];
      }
      delete updated.$inc;
    }
    if (update.$push) {
      for (const pushKey in update.$push) {
        if (!Array.isArray(updated[pushKey])) updated[pushKey] = [];
        updated[pushKey].push(update.$push[pushKey]);
      }
      delete updated.$push;
    }

    items[idx] = updated;
    this.write(items);
    return updated;
  }

  async findOneAndUpdate(query, update) {
    const item = await this.findOne(query);
    if (!item) return null;
    return this.findByIdAndUpdate(item._id, update);
  }

  async deleteOne(query) {
    const items = this.read();
    const item = items.find(item => {
      for (const key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
    if (!item) return { deletedCount: 0 };
    const filtered = items.filter(i => i._id !== item._id);
    this.write(filtered);
    return { deletedCount: 1 };
  }

  async deleteMany(query = {}) {
    if (Object.keys(query).length === 0) {
      this.write([]);
      return { deletedCount: 'all' };
    }
    // simple delete
    const items = this.read();
    const filtered = items.filter(item => {
      for (const key in query) {
        if (item[key] === query[key]) return false;
      }
      return true;
    });
    this.write(filtered);
    return { deletedCount: items.length - filtered.length };
  }

  async countDocuments(query = {}) {
    const items = await this.find(query);
    return items.length;
  }

  async updateMany(query, update) {
    const items = this.read();
    let count = 0;
    const updated = items.map(item => {
      let matches = true;
      for (const key in query) {
        if (item[key] !== query[key]) matches = false;
      }
      if (matches) {
        count++;
        return { ...item, ...update };
      }
      return item;
    });
    this.write(updated);
    return { modifiedCount: count };
  }
}
