import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "../common/common.entity";

@Entity()
class User extends CommonEntity {}
