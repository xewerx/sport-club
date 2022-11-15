import { ResultEntity } from './result.entity';

export type Result = Omit<ResultEntity, 'id'>;
