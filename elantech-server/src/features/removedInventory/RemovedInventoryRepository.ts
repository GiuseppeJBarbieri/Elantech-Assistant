import db from '../../models';
import BaseRepository from '../BaseRepository';

const RemovedInventoryRepository = {
  ...BaseRepository(db.company),
};

export default RemovedInventoryRepository;
