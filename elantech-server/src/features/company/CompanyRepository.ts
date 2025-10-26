import db from '../../models';
import BaseRepository from '../BaseRepository';
import IRepoError from '../../utils/interfaces/IRepoError';

const repoErr: IRepoError = {
  location: 'CompanyRepository.js',
  statusCode: 500,
};

const CompanyRepository = {
  ...BaseRepository(db.company, repoErr, 'company'),
};

export default CompanyRepository;
