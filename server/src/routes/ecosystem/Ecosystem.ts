import * as dynamoose from "dynamoose";
import { Document } from "dynamoose/dist/Document";
import Config from "../../config";

export class Ecosystem extends Document {
  id!: string;
  owner_id!: string;

  rows!: number;
  columns!: number;

  directive_composition!: string;
  directives?: [name: string, definition: string][];
}

const EcosystemSchema = new dynamoose.Schema({
  id: String,
  owner_id: String,

  rows: Number,
  columns: Number,

  directive_composition: String,
  directives: {
    type: Array,
    schema: [{ type: [String] }],
    required: false,
  },
});

export const EcosystemRepository = dynamoose.model<Ecosystem>(
  Config.ECOSYSTEM_TABLE,
  EcosystemSchema
);
