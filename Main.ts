import { Cache } from './Cache';

let cache = Cache.getInstance();
cache.insert('Rabi', 'Siddique');
cache.get('Rabi');
