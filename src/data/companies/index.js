import hexaware from './hexaware/company.json';
import tcs from './tcs/company.json';
import infosys from './infosys/company.json';
import wipro from './wipro/company.json';
import cognizant from './cognizant/company.json';
import accenture from './accenture/company.json';
import capgemini from './capgemini/company.json';
import hcl from './hcl/company.json';
import ltimindtree from './ltimindtree/company.json';
import techmahindra from './techmahindra/company.json';
import ibm from './ibm/company.json';
import deloitte from './deloitte/company.json';
import ey from './ey/company.json';
import kpmg from './kpmg/company.json';
import pwc from './pwc/company.json';
import zoho from './zoho/company.json';

const companies = [
  hexaware, tcs, infosys, wipro, cognizant, accenture,
  capgemini, hcl, ltimindtree, techmahindra, ibm, deloitte,
  ey, kpmg, pwc, zoho
];

export default companies;

export const getCompanyById = (id) => companies.find(c => c.id === id);
