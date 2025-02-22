import db from '../../models';
import BaseRepository from '../BaseRepository';
import IRepoError from '../../utils/interfaces/IRepoError';

const repoErr: IRepoError = {
  location: 'RemovedInventoryRepository.js',
  statusCode: 500,
};

const RemovedInventoryRepository = {
  ...BaseRepository(db.company, repoErr),
};

export default RemovedInventoryRepository;
