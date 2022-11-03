import utils from "../../utils";
import { EcosystemRepository } from "./Ecosystem";

interface Ecosystem {
  name: string;

  public: boolean,
  type: "ascii" | "buffer",

  rows: number;
  columns: number;
  description: string;

  directive_composition: string;
  directives?: [name: string, definition: string][];
}

export const  createEcosystem = async (
  userId: string,
  ecosystem: Ecosystem
) => {
  await EcosystemRepository.create({
    id: utils.getUUID(),

    name: ecosystem.name,
    owner_id: userId,

    type: ecosystem.type,
    public: ecosystem.public,

    rows: ecosystem.rows,
    columns: ecosystem.columns,
    description: ecosystem.description,

    directives: ecosystem.directives,
    directive_composition: ecosystem.directive_composition,
  });
};

export const updateEcosystem = (id: string, ecosystem: Ecosystem) => {
  EcosystemRepository.update({ id }, ecosystem);
};

export const deleteEcosystem = (id: string) => {
  EcosystemRepository.delete({ id });
};
