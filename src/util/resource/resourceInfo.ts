import { ObjectInfo } from '../object/objectInfo';

export interface ResourceInfo extends ObjectInfo {}

const resourceInfo: Record<string, ResourceInfo> = {};

export default resourceInfo;
