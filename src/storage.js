export class Storage {
  get(key) {
    try {
      const serializedData = localStorage.getItem(key);
      return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
      console.error(`Error getting item from storage: ${error}`);
      return null;
    }
  }

  set(key, data) {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error(`Error setting item in storage: ${error}`);
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from storage: ${error}`);
    }
  }

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing storage: ${error}`);
    }
  }
}
