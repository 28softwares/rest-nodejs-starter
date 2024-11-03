import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { Admin } from '../admin/Admin.entity';

export enum LogAction {
  'ADD_CAROUSEL' = 'ADD_CAROUSEL',
  'UPDATE_CAROUSEL' = 'UPDATE_CAROUSEL',
  'DELETE_CAROUSEL' = 'DELETE_CAROUSEL',
  //
  'ADD_PRODUCT' = 'ADD_PRODUCT',
  'UPDATE_PRODUCT' = 'UPDATE_PRODUCT',
  'DELETE_PRODUCT' = 'DELETE_PRODUCT',
  //
  'ADD_CATEGORY' = 'ADD_CATEGORY',
  'UPDATE_CATEGORY' = 'UPDATE_CATEGORY',
  'DELETE_CATEGORY' = 'DELETE_CATEGORY',
}

@Entity('log')
export class Log extends CommonEntity {
  @Column()
  action: LogAction;

  @ManyToOne(() => Admin, (a) => a.logs)
  actionBy: Admin; // admin ID
}
