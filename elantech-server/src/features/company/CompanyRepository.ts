import db from '../../models';
import BaseRepository from '../BaseRepository';

const CompanyRepository = {
  ...BaseRepository(db.company),
};

export default CompanyRepository;
