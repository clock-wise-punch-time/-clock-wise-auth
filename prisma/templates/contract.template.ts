import { Root } from "prisma/@types";


export const contract = (data: Root) => {
  return `
import {
  Prisma,
  ${data.models.map((model) => model.name).join(",\n  ")}
} from "@prisma/client"

/**
 * Representa os nomes dos modelos no Prisma.
 *
 * @alpha
 */

export type ModelName = 
  | ${data.models.map((model) => `"${model.name}"`).join("\n  | ")}

/**
 * Representa os modelos Prisma e seus tipos associados.
 *
 * @alpha
 */
export type PrismaModels = {
  ${data.models
      .map((model) => `${model.name}: Prisma.${model.name}Delegate<any>`)
      .join("\n  ")}
}

/**
 * Representa o tipo associado a um modelo específico.
 *
 * @alpha
 */
export type ModelType<M extends keyof PrismaModels> = PrismaModels[M]

/**
 * Representa os dados associados a um modelo específico.
 *
 * @remarks
 * Esta interface descreve os tipos de dados associados a cada modelo na aplicação.
 *
 * @alpha
 */
interface Data {
  ${data.models.map((model) => `  ${model.name}: ${model.name}`).join("\n  ")}
}

/**
 * Representa as relações Prisma associadas a cada modelo.
 *
 * @remarks
 * Esta interface descreve as relações Prisma entre diferentes modelos no contexto da aplicação.
 *
 * @alpha
 */
interface PrismaRelations {
  ${(data.relationships ?? [])
      .map((relation) => {
        const relationsString =
          (relation.relations ?? []).length > 0
            ? `/**
   * Relações associadas ao modelo \`${relation.model}\`.
   */
  ${relation.model}: {
    ${relation.relations
              .map((rel) => {
                return `${rel.name}: ${new RegExp(/\[\]$/).test(rel.relation)
                  ? `PrismaRelations["${rel.relation.replace(/[\[\]]|\?/g, "")}"][]`
                  : `PrismaRelations["${rel.relation.replace(/[\[\]]|\?/g, "")}"]`
                  }`;
              })
              .join("\n    ")}
  } & ${relation.model}`
            : `${relation.model}: {} & ${relation.model}`;
        return relationsString;
      })
      .join("\n\n  ")}
}

/**
 * Representa o payload da relação Prisma para um modelo específico.
 *
 * @alpha
 */
type PrismaRelationPayload<T extends keyof PrismaRelations> = PrismaRelations[T]

/**
 * Representa o tipo de dados associados a um modelo específico.
 *
 * @alpha
 */
export type DataType<T extends keyof Data> = Data[T]

/**
 * Interface que define métodos padrões para operações no Prisma.
 *
 * @alpha
 */
/**
 * Interface para operações CRUD utilizando Prisma.
 *
 * @remarks
 * Esta interface define métodos para criar, recuperar, atualizar e excluir registros no banco de dados
 * utilizando o Prisma, com suporte para operações relacionais.
 *
 * @typeparam T - Um tipo genérico que representa um modelo de dados disponível no Prisma.
 *
 * @public
 */
export interface IPrisma<T extends keyof Data> {
  /**
   * Cria um novo registro no banco de dados.
   *
   * @param data - Dados parciais do registro a ser criado.
   * @returns Uma Promise que resolve com o novo registro criado.
   *
   * @public
   */
  create: (data: Partial<DataType<T>>) => Promise<DataType<T>>

  /**
   * Cria vários registros no banco de dados.
   *
   * @param data - Uma matriz de dados parciais para os registros a serem criados.
   * @returns Uma Promise que resolve com uma matriz dos novos registros criados.
   *
   * @public
   */
  createMany: (data: Partial<DataType<T>>[]) => Promise<DataType<T>[]>

  /**
   * Recupera um único registro do banco de dados com base em um filtro.
   *
   * @param filter - Um filtro parcial para identificar o registro desejado.
   * @returns Uma Promise que resolve com o registro encontrado ou \`null\` se não for encontrado.
   *
   * @public
   */
  findOne: (filter: Partial<DataType<T>>) => Promise<DataType<T> | null>

  /**
   * Recupera um registro do banco de dados com base em seu ID.
   *
   * @param id - O ID do registro a ser recuperado.
   * @returns Uma Promise que resolve com o registro encontrado ou \`null\` se não for encontrado.
   *
   * @public
   */
  findById: (id: string) => Promise<DataType<T> | null>

  /**
   * Recupera todos os registros do banco de dados com opções de filtragem, paginação e ordenação.
   *
   * @param filter - Opções de filtragem, paginação e ordenação.
   * @returns Uma Promise que resolve com uma matriz de registros encontrados.
   *
   * @public
   */
  findAll: (
    filter?: { 
      skip?: number
      orderBy?: Record<string, string>[]
      take?: number
      startDate?: string
      endDate?: string
    } & Partial<DataType<T>>,
  ) => Promise<DataType<T>[]>

  /**
   * Atualiza um registro no banco de dados com base em seu ID.
   *
   * @param id - O ID do registro a ser atualizado.
   * @param data - Dados parciais a serem atualizados no registro.
   * @returns Uma Promise que resolve com o registro atualizado ou \`null\` se não for encontrado.
   *
   * @public
   */
  update: (id: string, data: Partial<DataType<T>>) => Promise<T | null>

  /**
   * Atualiza vários registros no banco de dados com base em um filtro.
   *
   * @param filter - Um filtro parcial para identificar os registros a serem atualizados.
   * @param data - Dados parciais a serem atualizados nos registros.
   * @returns Uma Promise que resolve com uma matriz dos registros atualizados.
   *
   * @public
   */
  updateMany: (
    filter: Partial<DataType<T>>,
    data: Partial<DataType<T>>,
  ) => Promise<T[]>

  /**
   * Exclui um registro do banco de dados com base em seu ID.
   *
   * @param id - O ID do registro a ser excluído.
   * @returns Uma Promise que resolve quando a exclusão for concluída.
   *
   * @public
   */
  deleteById: (id: string) => Promise<void>

  /**
   * Exclui vários registros do banco de dados com base em um filtro.
   *
   * @param filter - Um filtro parcial para identificar os registros a serem excluídos.
   * @returns Uma Promise que resolve quando a exclusão for concluída.
   *
   * @public
   */
  deleteMany: (filter: Partial<DataType<T>>) => Promise<void>

  /**
   * Recupera um registro com suas relações com base em seu ID.
   *
   * @param id - O ID do registro a ser recuperado com relações.
   * @param relations - Uma lista de relações a serem incluídas na consulta.
   * @returns Uma Promise que resolve com o registro e suas relações ou \`null\` se não for encontrado.
   *
   * @public
   */
  findByIdWithRelations: (
    id: string,
    relations: any[],
  ) => Promise<PrismaRelationPayload<T> | null>

  /**
   * Recupera um registro com suas relações com base em um filtro.
   *
   * @param relations - Uma lista de relações a serem incluídas na consulta.
   * @param filter - Um filtro parcial para identificar o registro desejado com relações.
   * @returns Uma Promise que resolve com o registro e suas relações ou \`null\` se não for encontrado.
   *
   * @public
   */
  findOneWithRelations: (
    relations: any[],
    filter?: Partial<DataType<any>>,
  ) => Promise<PrismaRelationPayload<T>>

  /**
   * Recupera todos os registros com suas relações com base em opções de filtragem, paginação e ordenação.
   *
   * @param relations - Uma lista de relações a serem incluídas na consulta.
   * @param filter - Opções de filtragem, paginação e ordenação.
   * @returns Uma Promise que resolve com uma matriz de registros e suas relações.
   *
   * @public
   */
  findAllWithRelations: (
    relations: any[],
    filter?: { 
      skip?: number;
      take?: number;
      orderBy?: Record<string, string>[];
      startDate?: string;
      endDate?: string;
      include?: Record<string, any>;
     } & Partial<DataType<any>>,
  ) => Promise<PrismaRelationPayload<T>[]>

  /**
   * Conta o número total de registros com base em um filtro.
   *
   * @param filter - Um filtro parcial para a contagem de registros.
   * @returns Uma Promise que resolve com o número total de registros.
   *
   * @public
   */
  count: (filter: Partial<unknown>) => Promise<number | null>

  /**
   * Conta o número total de registros com base em um filtro e suas relações.
   *
   * @param relations - Uma lista de relações a serem incluídas na consulta.
   * @param filter - Um filtro parcial para a contagem de registros.
   * @returns Uma Promise que resolve com o número total de registros.
   *
   * @public
   */
  countWithRelations: (relations: any[], filter: Partial<unknown>) => Promise<number | null>;
}

/**
 * Interface que define métodos padrões para operações no repositório Prisma.
 *
 * @alpha
 */
/**
 * Interface para operações CRUD utilizando um repositório Prisma genérico.
 *
 * @remarks
 * Esta interface define métodos padrão para operações de criação, recuperação, atualização e exclusão
 * de registros no banco de dados, utilizando um repositório Prisma genérico.
 *
 * @public
 */
export interface IPrismaRepository {
  /**
   * Cria um novo registro no banco de dados.
   *
   * @param data - Dados a serem utilizados para a criação do registro.
   * @returns Uma Promise que resolve com o novo registro criado.
   *
   * @public
   */
  create: (data: unknown) => Promise<unknown>

  /**
   * Cria vários registros no banco de dados.
   *
   * @param data - Uma matriz de dados para a criação dos registros.
   * @returns Uma Promise que resolve com uma matriz dos novos registros criados.
   *
   * @public
   */
  createMany: (data: unknown[]) => Promise<any[]>

  /**
   * Recupera um único registro do banco de dados com base em um filtro.
   *
   * @param filter - Um filtro parcial para identificar o registro desejado.
   * @returns Uma Promise que resolve com o registro encontrado ou \`null\` se não for encontrado.
   *
   * @public
   */
  findOne: (filter: Partial<unknown>) => Promise<unknown | null>

  /**
   * Recupera um registro do banco de dados com base em seu ID.
   *
   * @param id - O ID do registro a ser recuperado.
   * @returns Uma Promise que resolve com o registro encontrado ou \`null\` se não for encontrado.
   *
   * @public
   */
  findById: (id: string) => Promise<unknown | null>

  /**
   * Recupera todos os registros do banco de dados com base em um filtro.
   *
   * @param filter - Um filtro parcial para identificar os registros desejados.
   * @returns Uma Promise que resolve com uma matriz de registros encontrados.
   *
   * @public
   */
  findAll: (filter: Partial<unknown>) => Promise<unknown[]>

  /**
   * Atualiza um registro no banco de dados com base em seu ID.
   *
   * @param id - O ID do registro a ser atualizado.
   * @param data - Dados parciais a serem atualizados no registro.
   * @returns Uma Promise que resolve com o registro atualizado ou \`null\` se não for encontrado.
   *
   * @public
   */
  update: (id: string, data: Partial<unknown>) => Promise<unknown | null>

  /**
   * Atualiza vários registros no banco de dados com base em um filtro.
   *
   * @param filter - Um filtro parcial para identificar os registros a serem atualizados.
   * @param data - Dados parciais a serem atualizados nos registros.
   * @returns Uma Promise que resolve com os registros atualizados ou \`null\` se não for encontrado nenhum.
   *
   * @public
   */
  updateMany: (
    filter: Partial<unknown>,
    data: Partial<unknown>,
  ) => Promise<unknown | null>

  /**
   * Exclui um registro do banco de dados com base em seu ID.
   *
   * @param id - O ID do registro a ser excluído.
   * @returns Uma Promise que resolve quando a exclusão for concluída.
   *
   * @public
   */
  deleteById: (id: string) => Promise<void>

  /**
   * Exclui vários registros do banco de dados com base em um filtro.
   *
   * @param filter - Um filtro parcial para identificar os registros a serem excluídos.
   * @returns Uma Promise que resolve quando a exclusão for concluída.
   *
   * @public
   */
  deleteMany: (filter: Partial<unknown>) => Promise<void>

  /**
   * Recupera um registro com suas relações com base em seu ID.
   *
   * @param id - O ID do registro a ser recuperado com relações.
   * @param relations - Uma lista de relações a serem incluídas na consulta.
   * @returns Uma Promise que resolve com o registro e suas relações ou \`null\` se não for encontrado.
   *
   * @public
   */
  findByIdWithRelations: (
    id: string,
    relations: any[],
  ) => Promise<unknown | null>

  /**
   * Recupera todos os registros com suas relações com base em um filtro.
   *
   * @param relations - Uma lista de relações a serem incluídas na consulta.
   * @param filter - Um filtro parcial para identificar os registros desejados com relações.
   * @returns Uma Promise que resolve com uma matriz de registros e suas relações.
   *
   * @public
   */
  findAllWithRelations: (
    relations: any[],
    filter?: Partial<any>,
  ) => Promise<any>

  /**
   * Conta o número total de registros com base em um filtro.
   *
   * @param filter - Um filtro parcial para a contagem de registros.
   * @returns Uma Promise que resolve com o número total de registros.
   *
   * @public
   */
  count: (filter: Partial<unknown>) => Promise<number | null>

  /**
   * Conta o número total de registros com base em um filtro e relações com demais entidades.
   *
   * @param filter - Um filtro parcial para a contagem de registros.
   * @param relations - Um filtro de inclusão baseado em entidades relacionais.
   * @returns Uma Promise que resolve com o número total de registros.
   *
   * @public
   */
  countWithRelations(
    filter: Partial<unknown>,
    relations: Record<string, any>,
  ): Promise<any>
}

`;
};
