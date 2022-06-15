import utils from "../../utils";
import { UserIdentifier } from "../auth/auth.service";
import { EcosystemRepository } from "./Ecosystem";

interface Ecosystem {
  rows: number;
  columns: number;

  directive_composition: string;
  directives?: [name: string, definition: string][];
}

export const createEcosystem = (
  userIdentifier: UserIdentifier,
  ecosystem: Ecosystem
) => {
  EcosystemRepository.create({
    name: utils.getUUID(),
    owner_id: userIdentifier.id,

    rows: ecosystem.rows,
    columns: ecosystem.columns,

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
