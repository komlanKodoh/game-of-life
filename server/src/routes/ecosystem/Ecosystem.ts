import * as dynamoose from "dynamoose";
import { Document } from "dynamoose/dist/Document";
import Config from "../../config";

export class Ecosystem extends Document {
  name!: string;
  owner_id!: string;

  public!: boolean;
  type!: "ascii" | "buffer";

  rows!: number;
  columns!: number;
  description!: string;

  directive_composition!: string;
  directives?: [name: string, definition: string][];
}

const EcosystemSchema = new dynamoose.Schema(
  {
    name: String,
    owner_id: String,

    type: String,
    public: Boolean,

    rows: Number,
    columns: Number,
    description:String,

    directive_composition: String,
    directives: {
      type: Array,
      schema: [{ type: [String] }],
      required: false,
    },
  },
  {
    saveUnknown: false,
    timestamps: true,
  }
);

export const EcosystemRepository = dynamoose.model<Ecosystem>(
  Config.ECOSYSTEM_TABLE,
  EcosystemSchema
);
